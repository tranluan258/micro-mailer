import IMail from "./IMail";
import nodemailer from "nodemailer";
import "dotenv/config";
import { MessageQueue } from "../datatype/messageQueue";

const { EMAIL_ADMIN, PASSWORD_EMAIL } = process.env;

type transporter = nodemailer.Transporter;

class SendWithICloud implements IMail {
  private static instance: SendWithICloud;
  private transporter: transporter;
  private constructor(transporter: transporter) {
    this.transporter = transporter;
  }

  public static getInstance(): SendWithICloud {
    if (!SendWithICloud.instance) {
      let transporter: transporter = nodemailer.createTransport({
        host: "smtp.icloud.com",
        port: 465,
        secure: true,
        auth: {
          user: EMAIL_ADMIN,
          pass: PASSWORD_EMAIL,
        },
      });

      SendWithICloud.instance = new SendWithICloud(transporter);
    }

    return SendWithICloud.instance;
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

    let content: string = `
        <div style="padding: 10px; background-color: white;">
            Hello ${emailClient}
        </div>
        `;
    let mailOptions = {
      from: "Admin",
      to: emailClient,
      subject: "Send Email",
      html: content,
      attachment: attachmentsSend,
    };

    this.transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      }
    });
  }
}

export default SendWithICloud;
