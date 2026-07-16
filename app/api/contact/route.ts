import {NextRequest,NextResponse} from "next/server";
import {createHash,randomUUID} from "node:crypto";
import {submitContact} from "@/lib/email/contact";
import {resendMailClient} from "@/lib/email/resend";

const recent=new Map<string,number>();
const WINDOW=10*60*1000;
type Category="none"|"rate_limited"|"invalid_json"|"spam_rejected"|"configuration"|"validation"|"resend_notification"|"resend_confirmation";

function logContact(requestId:string,success:boolean,resendEmailId:string|null,errorCategory:Category){const entry={requestId,timestamp:new Date().toISOString(),success,resendEmailId,errorCategory};if(success)console.info(JSON.stringify(entry));else console.error(JSON.stringify(entry))}

export async function POST(request:NextRequest){
  const requestId=randomUUID();
  const key=createHash("sha256").update(request.headers.get("x-forwarded-for")??"local").digest("hex").slice(0,16);
  const now=Date.now(),last=recent.get(key)??0;
  if(now-last<30_000){logContact(requestId,false,null,"rate_limited");return NextResponse.json({ok:false,message:"Please wait before trying again."},{status:429})}
  let body:Record<string,unknown>;
  try{body=await request.json()}catch{logContact(requestId,false,null,"invalid_json");return NextResponse.json({ok:false,message:"Please check the form."},{status:400})}
  if(body.website){logContact(requestId,false,null,"spam_rejected");return NextResponse.json({ok:true,message:"Message received."})}
  recent.set(key,now);for(const [storedKey,time] of recent)if(now-time>WINDOW)recent.delete(storedKey);
  const apiKey=process.env.RESEND_API_KEY;
  if(!apiKey){logContact(requestId,false,null,"configuration");return NextResponse.json({ok:false,message:"Email is temporarily unavailable."},{status:503})}
  const result=await submitContact(body,resendMailClient(apiKey),process.env);
  const category:Category=result.code==="invalid"?"validation":result.code==="send_failed"?"resend_notification":result.code==="confirmation_failed"?"resend_confirmation":result.code==="unavailable"?"configuration":"none";
  logContact(requestId,result.ok,result.resendEmailId,category);
  return NextResponse.json({ok:result.ok,message:result.ok?"Your message has been sent.":result.code==="invalid"?"Please check the highlighted information.":"Your message could not be sent. Please try again later."},{status:result.status})
}
