import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { summary, emails } = await req.json();

    const recipients = emails.split(",").map((email: string) => email.trim());

    const data = await resend.emails.send({
      from: "AI Summarizer <onboarding@resend.dev>", 
      to: recipients,
      subject: "Meeting Summary",
      html: `<div style="font-family: sans-serif; line-height: 1.5;">
        <h2>📋 Meeting Summary</h2>
        <p>${summary.replace(/\n/g, "<br/>")}</p>
      </div>`,
    });

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
    });
  } catch (error: any) {
    console.error("Email send error:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}
