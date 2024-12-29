'use server';

import { ConnectForm } from '@types';
import nodemailer from 'nodemailer';

const { EMAIL, EMAIL_PASS } = process.env;

export async function sendMail({ emailContent }: { emailContent: ConnectForm }) {
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
    const testResult = await transporter.verify();
    // console.log('test Result', testResult);
  } catch (error) {
    console.error({ error });
    return;
  }

  try {
    const sendResult = await transporter.sendMail({
      from: EMAIL,
      to: EMAIL,
      subject: `[New Message from Herotoall.io]`,
      html: `<h1>You've got a message from ${emailContent.name}</h1>
          <p><strong>Email:</strong> ${emailContent.email}</p>
          <p><strong>Message:</strong> ${emailContent.message}</p>`
    });
    console.log('Send Result', sendResult);
    return sendResult;
  } catch (error) {
    console.log('error', error);
  }
}
