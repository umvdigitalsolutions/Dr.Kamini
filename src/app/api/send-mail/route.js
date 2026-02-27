import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.MAILSEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message, phone } = body;

    // 1. Log to server console to verify data is arriving
    console.log("Attempting to send email from:", process.env.MAILSEND_FROM_EMAIL);
    
    // Check if Env Vars are loaded
    if (!process.env.MAILSEND_FROM_EMAIL) {
      throw new Error("MAILSEND_FROM_EMAIL is missing in .env.local. Did you restart the server?");
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 2. Send using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.MAILSEND_FROM_EMAIL, 
      to: process.env.MAILSEND_TO_EMAIL, 
      reply_to: email,
      subject: `New Inquiry from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body style="font-family: Arial, sans-serif; padding: 20px; color: #333; line-height: 1.6; margin: 0;">
            <h2 style="color: #111;">New Contact Form Submission</h2>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
              <p style="margin: 0 0 10px 0;"><strong>Customer Name:</strong> ${name}</p>
              <p style="margin: 0 0 10px 0;"><strong>Customer Email:</strong> <a href="mailto:${email}">${email}</a></p>
              ${phone ? `<p style="margin: 0;"><strong>Phone:</strong> ${phone}</p>` : ''}
            </div>

            <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
            
            <p><strong>Message:</strong></p>
            <div style="white-space: pre-wrap; border-left: 4px solid #eaeaea; padding-left: 15px; margin-top: 10px; color: #555;">${message}</div>
          </body>
        </html>
      `,
    });

    // 3. Handle Resend API Errors
    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });

  } catch (error) {
    // 4. Handle Server Errors
    console.error("Server Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}