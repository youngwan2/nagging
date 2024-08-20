import { adsense_v2 } from 'googleapis';
import * as nodeMailer from 'nodemailer';

interface Mailer {
  to: string;
  subject: string;
  html?: string;
  csv?: adsense_v2.Schema$HttpBody;
  reportName: string;
}

export const sendMail = async ({ to, subject, html, csv, reportName }: Mailer) => {
  const defaultHTML = `
  <div style="font-family: 'Noto Sans KR', sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
  <header style="text-align: center; padding: 10px 0;">
    <h1 style="font-size: 1.8em; color: #0044cc; font-weight: bold;">Nagging</h1>
  </header>

  <section style="padding: 30px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; text-align: center;">
    <p style="font-size: 1.3em; font-weight: bold; color: #333;">이번 달 AdSense 수익 보고서가 준비되었습니다.</p>
    <p style="font-size: 1.1em; color: #666;">안녕하세요, ${to}님! 이번 정기  AdSense 수익 보고서를 첨부 파일로 보내드립니다.</p>
    <p style="font-size: 1.1em; color: #666;">첨부된 파일을 통해 자세한 내용을 확인해 주세요.</p>
  </section>

  <footer style="text-align: center; padding: 20px 0; font-size: 0.9em; color: #666;">
    <p>Nagging과 함께해주셔서 감사합니다. 더 나은 서비스를 위해 언제든지 <a target="_blank" href="https://forms.gle/iuYDAHxBoqkKbgpa6" style="color: #0044cc;">문의해 주세요</a>.</p>
  </footer>
</div>
  `;

  try {
    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL || '', pass: process.env.PASS || '' },
    });

    const mailOptions = csv
      ? {
          to,
          subject,
          html: html ?? defaultHTML,
          attachments: [
            {
              filename: `${reportName}.csv`,
              content: csv as string,
            },
          ],
        }
      : {
          to,
          subject,
          html: html ?? defaultHTML,
        };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error + ': 이메일 전송 실패');
  }
};
