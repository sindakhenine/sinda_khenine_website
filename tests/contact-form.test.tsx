import {afterEach,describe,expect,it,vi} from "vitest";
import {cleanup,fireEvent,render,screen,waitFor} from "@testing-library/react";

vi.mock("@vercel/analytics",()=>({track:vi.fn()}));
import {ContactForm} from "../components/ContactForm";

afterEach(()=>{cleanup();vi.restoreAllMocks()});

function completeForm(){
  fireEvent.change(screen.getByLabelText("Name"),{target:{value:"Ada Lovelace"}});
  fireEvent.change(screen.getByLabelText("Email"),{target:{value:"ada@example.com"}});
  fireEvent.change(screen.getByLabelText("Subject"),{target:{value:"Speaking inquiry"}});
  fireEvent.change(screen.getByLabelText("Message"),{target:{value:"Could we discuss a conference session?"}});
}

describe("contact form error mapping",()=>{
  it("sends JSON with the expected payload and highlights the server field",async()=>{
    const fetchMock=vi.spyOn(globalThis,"fetch").mockResolvedValue(new Response(JSON.stringify({ok:false,message:"Please check the highlighted information.",errors:{name:"Enter at least 2 characters."}}),{status:400,headers:{"Content-Type":"application/json"}}));
    render(<ContactForm/>);completeForm();fireEvent.submit(screen.getByRole("button",{name:"Send Message"}).closest("form")!);
    await waitFor(()=>expect(screen.getByLabelText("Name").getAttribute("aria-invalid")).toBe("true"));
    expect(screen.getByText("Enter at least 2 characters.")).toBeTruthy();
    const init=fetchMock.mock.calls[0][1]!;expect((init.headers as Record<string,string>)["Content-Type"]).toBe("application/json");
    expect(JSON.parse(String(init.body))).toMatchObject({name:"Ada Lovelace",email:"ada@example.com",subject:"Speaking inquiry",message:"Could we discuss a conference session?",website:"",sourcePage:"/contact"});
  });

  it("does not claim fields are highlighted when the server supplies none",async()=>{
    vi.spyOn(globalThis,"fetch").mockResolvedValue(new Response(JSON.stringify({ok:false,message:"Please check the highlighted information.",errors:{}}),{status:400,headers:{"Content-Type":"application/json"}}));
    render(<ContactForm/>);completeForm();fireEvent.submit(screen.getByRole("button",{name:"Send Message"}).closest("form")!);
    expect(await screen.findByText("The form could not be validated. Please reload the page and try again.")).toBeTruthy();
  });
});
