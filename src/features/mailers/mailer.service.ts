
import { EMAIL_VERIFICATION_EXPIRY_HOURS} from "../../configs/env.config";
import { MailerUtil } from "../../utils/mailer/mailer.utils";
import { TemplateUtil } from "../../utils/mailer/template/tamplate.util";
 
const APP_BASE_URL = process.env.APP_BASE_URL ?? "http://localhost:3000";

 
type SendEmailVerificationParams = {
  to: string;
  token: string; 
};
 
export class MailerService {
  static async sendEmailVerification({ to, token }: SendEmailVerificationParams) {
    const verificationUrl = `${APP_BASE_URL}/verify-email?token=${encodeURIComponent(token)}`;
 
    const html = TemplateUtil.compile("email-verification", {
      verificationUrl,
      expiryHours: EMAIL_VERIFICATION_EXPIRY_HOURS,
    });
 
    return MailerUtil.sendMail({
      to,
      subject: "Verifikasi email Popo Laundry kamu",
      html,
    });
  }
}