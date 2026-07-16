import {afterAll,beforeEach,describe,expect,it,vi} from "vitest";
import {NextRequest} from "next/server";

const mocks=vi.hoisted(()=>({send:vi.fn()}));
vi.mock("../lib/email/resend",()=>({resendMailClient:()=>({send:mocks.send})}));
import {POST,resetContactRateLimitForTests} from "../app/api/contact/route";

const valid={name:"Ada Lovelace",email:"ada@example.com",subject:"Speaking inquiry",message:"Could we discuss a conference session?",sourcePage:"/contact",website:"",startedAt:1};
const originalEnv={...process.env};
function request(body:string|Record<string,unknown>,ip="203.0.113.10"){return new NextRequest("https://example.com/api/contact",{method:"POST",headers:{"Content-Type":"application/json","x-forwarded-for":ip},body:typeof body==="string"?body:JSON.stringify(body)})}

describe("contact route",()=>{
  beforeEach(()=>{resetContactRateLimitForTests();mocks.send.mockReset().mockResolvedValue({id:"email-id"});process.env.RESEND_API_KEY="re_test";process.env.RESEND_FROM_EMAIL="Sinda Khenine <hello@sindakhenine.com>";process.env.CONTACT_TO_EMAIL="founder@skatalystai.com"});
  afterAll(()=>{process.env=originalEnv});

  it("returns structured field errors for a 400",async()=>{const response=await POST(request({...valid,name:" "}));expect(response.status).toBe(400);expect(await response.json()).toMatchObject({ok:false,errors:{name:expect.any(String)}});expect(mocks.send).not.toHaveBeenCalled()});
  it("rejects malformed JSON",async()=>{const response=await POST(request("{"));expect(response.status).toBe(400);expect(await response.json()).toMatchObject({errors:{form:expect.any(String)}})});
  it("silently accepts a honeypot submission without sending",async()=>{const response=await POST(request({...valid,website:"bot"}));expect(response.status).toBe(200);expect(mocks.send).not.toHaveBeenCalled()});
  it("allows a valid request after a validation failure",async()=>{expect((await POST(request({...valid,message:"short"}))).status).toBe(400);expect((await POST(request(valid))).status).toBe(200);expect(mocks.send).toHaveBeenCalledTimes(2)});
  it("rate limits repeated valid send attempts and supplies wait time",async()=>{expect((await POST(request(valid))).status).toBe(200);const response=await POST(request(valid));expect(response.status).toBe(429);expect(response.headers.get("Retry-After")).toMatch(/^\d+$/);expect(await response.json()).toMatchObject({retryAfter:expect.any(Number),message:expect.stringContaining("seconds")});expect(mocks.send).toHaveBeenCalledTimes(2)});
  it("reaches Resend for a successful valid request",async()=>{const response=await POST(request(valid));expect(response.status).toBe(200);expect(await response.json()).toMatchObject({ok:true});expect(mocks.send).toHaveBeenCalledTimes(2);expect(mocks.send.mock.calls[0][0]).toMatchObject({replyTo:"ada@example.com",to:["founder@skatalystai.com"]})});
});
