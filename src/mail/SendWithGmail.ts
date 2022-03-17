import { MessageQueue } from "../interface/messageQueue";
import IMail from "./IMail";
import nodemailer from "nodemailer";
import "dotenv/config";

const { EMAIL_ADMIN, PASSWORD_EMAIL } = process.env;
class SendWithGmail implements IMail {
  private static instance: SendWithGmail;
  private transporter: nodemailer.Transporter;
  private constructor(transporter: nodemailer.Transporter) {
    this.transporter = transporter;
  }

  public static getInstance(): SendWithGmail {
    if (!SendWithGmail.instance) {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: EMAIL_ADMIN,
          pass: PASSWORD_EMAIL,
        },
      });

      SendWithGmail.instance = new SendWithGmail(transporter);
    }

    return SendWithGmail.instance;
  }

  public sendMail(emailClient: string, attachments: MessageQueue["attachments"]): void {
    let attachmentsSend: { filename: string; content: Buffer }[] = [];

    if (attachments) {
      attachments.forEach((element) => {
        const fileContents = Buffer.from(element.content, "base64");
        attachmentsSend.push({
          filename: element.filename,
          content: fileContents,
        });
      });
    }

    let content = " ";
    content += `
        <div style="padding: 10px; background-color: white;">
            Hello ${emailClient}
        </div>
        `;

    let mailOptions = {
      from: "Admin",
      to: emailClient,
      subject: "Send Email",
      html: content,
      attachments: attachmentsSend,
    };

    this.transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      }
    });
  }
}

export default SendWithGmail;
