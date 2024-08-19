import { adsense_v2 } from 'googleapis';
import * as nodeMailer from 'nodemailer';

interface Mailer {
  to: string;
  subject: string;
  html?: string;
  csv: adsense_v2.Schema$HttpBody;
  reportName: string;
}

export const sendMail = async ({ to, subject, html, csv, reportName }: Mailer) => {
  const defaultHTML = `
  <div>
  <h2>Message Details</h2>
  <div class="email" style="font-size: 1.1em;">Email : ${to}</div>
  <div class="phone" style="font-size: 1.1em;">Title : ${subject}</div>
  <div class="message" style="font-size: 1.1em;">message : </div>
  <pre class="message" style="font-size: 1.2em;">${'테스트'}</pre>
  </div>
  `;

  if (!csv) return false;
  try {
    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL || '', pass: process.env.PASS || '' },
    });

    const mailOptions = {
      to,
      subject,
      html: html ?? defaultHTML,
      attachments: [
        {
          filename: `${reportName}.csv`,
          content: csv as string,
        },
      ],
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error + ': 이메일 전송 실패');
  }
};
