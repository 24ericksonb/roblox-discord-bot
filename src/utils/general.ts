import nodemailer from "nodemailer";
import { EMAIL_ADDRESS, EMAIL_PASSWORD, PENDING_EXPIRATION } from "../constants";
import crypto from "crypto";

export function domainMatches(domain: string, email: string): boolean {
  const emailDomain = email.split("@")[1].toLowerCase();
  if (domain == "*") return true;
  const regexPattern = domain.replace(/\*/g, "[a-zA-Z0-9-]*").replace(".", "\\.");
  const regex = new RegExp("^" + regexPattern + "$");
  return regex.test(emailDomain);
}

export function generateCode(): string {
  const buffer = crypto.randomBytes(3);
  const code = buffer.readUIntBE(0, 3);
  return code.toString().padStart(6, "0").substring(0, 6);
}

export function sendEmail(email: string, code: string): void {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_ADDRESS,
      pass: EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: EMAIL_ADDRESS,
    to: email,
    subject: "Verification Code - Roblox Discord server",
    html: `
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0px 0px 10px rgba(0,0,0,0.2);">
          <h2 style="color: #333;">Welcome to Roblox Campus Recruiting Server!</h2>
          <p>
            This is your unique verification code that will grant you access to the Roblox Discord server. This code will expire in <strong>${PENDING_EXPIRATION}</strong> minutes.
            Please use the following code with the <code style="background-color: #f4f4f4; padding: 2px 4px; border-radius: 4px; color: #000;">/verify</code> command to gain access to the server.
          </p>
          <div style="background-color: #23242a; color: #fff; padding: 10px; text-align: center; border-radius: 5px;">
            <strong>Access Code:</strong> ${code}
          </div>
          <p>
            If you have any questions or need assistance, feel free to contact our support team.
          </p>
          <p>
            Best regards,<br />
            Roblox Campus Recruiting Team
          </p>
        </div>
      </body>
    </html>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      throw Error("Can't send email...");
    }
    return info.response;
  });
}
