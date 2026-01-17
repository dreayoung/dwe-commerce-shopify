'use server';

import nodemailer from 'nodemailer';

const { EMAIL, EMAIL_PASS } = process.env;

export async function sendMail(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL,
      // This MUST be a 16-character App Password, not your login password
      pass: EMAIL_PASS
    }
  });

  try {
    // Gmail is stricter with 'from' addresses. It will often default to your email
    // even if you set a different 'from' in the sendMail object.
    await transporter.sendMail({
      from: `"${name}" <${EMAIL}>`,
      to: EMAIL,
      replyTo: email, // This allows you to click "Reply" in your inbox to email the user back
      subject: `[New Message from Herotoall.io]`,
      html: `<h1>You've got a message from ${name}</h1>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`
    });

    return { success: true, message: 'Your message has been sent.' };
  } catch (error) {
    console.error('Mail error:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
}
