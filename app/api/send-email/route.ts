import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { to } = await req.json();

    const { data, error } = await resend.emails.send({
      from: "Znotes <onboarding@michealkhan.com>",
      to,
      subject: "Resend test",
      html: "<h1>Hey there!</h1>",
    });

    if (error) {
      console.error("Email send failed:", error);
      return Response.json({ success: false, error });
    }

    return Response.json({ success: true, data });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false });
  }
}
