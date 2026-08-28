import {NextRequest,NextResponse} from "next/server";
import {createHash,randomUUID} from "node:crypto";
import {submitContact,validateContact} from "@/lib/email/contact";
import {resendMailClient} from "@/lib/email/resend";

const recent=new Map<string,number>();
const RATE_LIMIT_MS=30_000;
const RETENTION_MS=10*60*1000;
type Category="none"|"rate_limited"|"invalid_json"|"spam_rejected"|"configuration"|"validation"|"resend_notification"|"resend_confirmation";
type RateDecision="not_checked"|"allowed"|"limited";

function logContact(entry:{requestId:string;success:boolean;errorCategory:Category;validationFailureFields?:string[];rateLimitDecision?:RateDecision;resendStatus?:string;successEmailId?:string|null}){
  const safe={requestId:entry.requestId,timestamp:new Date().toISOString(),success:entry.success,errorCategory:entry.errorCategory,validationFailureFields:entry.validationFailureFields??[],rateLimitDecision:entry.rateLimitDecision??"not_checked",resendStatus:entry.resendStatus??"not_attempted",successEmailId:entry.successEmailId??null};
  if(entry.success)console.info(JSON.stringify(safe));else console.error(JSON.stringify(safe));
}

export function resetContactRateLimitForTests(){recent.clear()}

export async function POST(request:NextRequest){
  const requestId=randomUUID();
  let body:Record<string,unknown>;
  try{body=await request.json()}catch{
    logContact({requestId,success:false,errorCategory:"invalid_json"});
    return NextResponse.json({ok:false,message:"The request could not be read.",errors:{form:"Please reload the page and try again."}},{status:400});
  }

  const validation=validateContact(body);
  if(validation.spam){
    logContact({requestId,success:true,errorCategory:"spam_rejected"});
    return NextResponse.json({ok:true,message:"Message received."});
  }
  if(validation.errors.length){
    logContact({requestId,success:false,errorCategory:"validation",validationFailureFields:validation.errors});
    return NextResponse.json({ok:false,message:"Please check the highlighted information.",errors:validation.fieldErrors},{status:400});
  }

  const apiKey=process.env.RESEND_API_KEY;
  if(!apiKey||!process.env.RESEND_FROM_EMAIL||process.env.CONTACT_TO_EMAIL!=="founder@skatalystai.com"){
    logContact({requestId,success:false,errorCategory:"configuration"});
    return NextResponse.json({ok:false,message:"Email is temporarily unavailable.",errors:{}},{status:503});
  }

  const key=createHash("sha256").update(request.headers.get("x-forwarded-for")??"local").digest("hex").slice(0,16);
  const now=Date.now(),last=recent.get(key)??0;
  if(now-last<RATE_LIMIT_MS){
    const retryAfter=Math.max(1,Math.ceil((RATE_LIMIT_MS-(now-last))/1000));
    logContact({requestId,success:false,errorCategory:"rate_limited",rateLimitDecision:"limited"});
    return NextResponse.json({ok:false,message:`Please wait ${retryAfter} seconds before trying again.`,errors:{},retryAfter},{status:429,headers:{"Retry-After":String(retryAfter)}});
  }
  recent.set(key,now);
  for(const [storedKey,time] of recent)if(now-time>RETENTION_MS)recent.delete(storedKey);

  const result=await submitContact(body,resendMailClient(apiKey),process.env);
  const category:Category=result.code==="send_failed"?"resend_notification":result.code==="confirmation_failed"?"resend_confirmation":result.code==="unavailable"?"configuration":"none";
  const resendStatus=result.ok?"sent":"resendErrorCategory" in result?result.resendErrorCategory:result.code;
  logContact({requestId,success:result.ok,errorCategory:category,rateLimitDecision:"allowed",resendStatus,successEmailId:result.ok?result.resendEmailId:null});
  return NextResponse.json({ok:result.ok,message:result.ok?"Your message has been sent.":"Your message could not be sent. Please try again later.",errors:{}},{status:result.status});
}
