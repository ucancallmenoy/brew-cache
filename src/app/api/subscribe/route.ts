import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GOOGLE_EMAIL,
      to: process.env.GOOGLE_EMAIL, 
      replyTo: email, 
      subject: 'New Subscription Request - Brew Cache',
      html: `
        <h2>New Subscription Request</h2>
        <p>A user has requested to subscribe to Brew Cache.</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>Please review and confirm their subscription.</p>
        <br>
        <p>Cheers,<br>Brew Cache Bot</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Subscription request sent successfully' });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ error: 'Failed to process subscription' }, { status: 500 });
  }
}