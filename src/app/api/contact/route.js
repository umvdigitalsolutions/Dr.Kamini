export async function POST(req) {
  try {
    const { name, email, message, phone } = await req.json();

    const response = await fetch("https://api.mailsend.com/v1/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MAILSEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: process.env.MAILSEND_FROM_EMAIL,
        to: "drkaminishakyapt@gmail.com",
        subject: `New message from ${name}`,
        text: `
          Name: ${name}
          Email: ${email}
          Phone: ${phone}
          Message: ${message}
        `,
      }),
    });

    const data = await response.json();

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}