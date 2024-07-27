import * as nodeMailer from 'nodemailer';

interface Mailer {
  to: string;
  subject: string;
  html: string;
}

export const sendMail = async ({ to, subject, html }: Mailer) => {
  try {
    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL || '', pass: process.env.PASS || '' },
    });

    const mailOptions = {
      to,
      subject,
      html,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error + ': 이메일 전송 실패');
  }
};
