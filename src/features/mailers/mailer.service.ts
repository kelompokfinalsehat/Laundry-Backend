
import { EMAIL_VERIFICATION_EXPIRY_HOURS, PASSWORD_RESET_EXPIRY_HOURS} from "../../configs/env.config";
import { MailerUtil } from "../../utils/mailer/mailer.utils";
import { TemplateUtil } from "../../utils/mailer/template/tamplate.util";
 
const APP_BASE_URL = process.env.APP_BASE_URL ?? "http://localhost:3000";

 
type SendEmailVerificationParams = {
  to: string;
  token: string; 
};

type SendEmployeeInvitationParams = {
  to: string;
  token: string;
  name: string
}
 
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

  static async sendEmployeeInvitation({
    to,
    token,
    name
}: SendEmployeeInvitationParams) {
    const invitationUrl =
        `${APP_BASE_URL}/internal/accept-invitation?token=${encodeURIComponent(token)}`;

    const html = TemplateUtil.compile(
        "employee-invitation",
        {
            name,
            invitationUrl,
            expiryHours: EMAIL_VERIFICATION_EXPIRY_HOURS,
        },
    );

    return MailerUtil.sendMail({
        to,
        subject: "Undangan akun Popo Laundry",
        html,
    });
}

  static async sendChangeEmailVerification({ to, token }: SendEmailVerificationParams) {
    const verificationUrl = `${APP_BASE_URL}/profil/confirm-email?token=${encodeURIComponent(token)}`;
 
    const html = TemplateUtil.compile("change-email-verification", {
      verificationUrl,
      expiryHours: EMAIL_VERIFICATION_EXPIRY_HOURS,
    });
 
    return MailerUtil.sendMail({
      to,
      subject: "Verifikasi perubahan email Popo Laundry kamu",
      html,
    });
  }

   static async sendPasswordReset({ to, token }: SendEmailVerificationParams) {
    const resetUrl = `${APP_BASE_URL}/reset-password?token=${encodeURIComponent(token)}`;
 
    const html = TemplateUtil.compile("password-reset", {
      resetUrl,
      expiryHours: PASSWORD_RESET_EXPIRY_HOURS,
    });
 
    return MailerUtil.sendMail({
      to,
      subject: "Reset password Popo Laundry kamu",
      html,
    });
  }

  static async sendEmployeePasswordReset({to, token}: SendEmailVerificationParams) {
    const resetUrl = `${APP_BASE_URL}/internal/reset-password?token=${encodeURIComponent(token)}`;
    const html = TemplateUtil.compile("password-reset", {
      resetUrl,
      expiryHours: PASSWORD_RESET_EXPIRY_HOURS,
    });
 
    return MailerUtil.sendMail({
      to,
      subject: "Reset password Popo Laundry kamu",
      html,
    });
  }
}