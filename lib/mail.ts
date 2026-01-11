'use server';

import nodemailer from 'nodemailer';

const { EMAIL, EMAIL_PASS } = process.env;

export async function sendMail(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  const transporter = nodemailer.createTransport({
    host: 'smtp-legacy.office365.com',
    port: 587,
    secure: false,
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false
    },
    auth: {
      user: EMAIL,
      pass: EMAIL_PASS
    }
  });

  try {
    await transporter.verify();
    const sendResult = await transporter.sendMail({
      from: EMAIL,
      to: EMAIL,
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
