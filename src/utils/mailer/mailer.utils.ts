import transporter from "../../configs/nodemailer.configs";

type SendMail = {
  to: string;
  subject: string;
  html: string;
};

export class MailerUtil {
  static async sendMail({ to, subject, html }: SendMail) {
    return await transporter.sendMail({
      to,
      subject,
      html,
    });
  }
}