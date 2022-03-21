import { MessageQueue } from "../datatype/messageQueue";
import IMail from "./IMail";
import nodemailer from "nodemailer";
import "dotenv/config";
import ejs from "ejs";

const { GMAIL_HOST, GMAIL_PASSWORD } = process.env;
type transporter = nodemailer.Transporter;

class SendWithGmail implements IMail {
  private static instance: SendWithGmail;
  private transporter: transporter;
  private constructor(transporter: transporter) {
    this.transporter = transporter;
  }

  public static getInstance(): SendWithGmail {
    if (!SendWithGmail.instance) {
      let transporter: transporter = nodemailer.createTransport({
        service: "Gmail",
        port: 465,
        secure: true,
        auth: {
          user: GMAIL_HOST,
          pass: GMAIL_PASSWORD,
        },
      });

      SendWithGmail.instance = new SendWithGmail(transporter);
    }

    return SendWithGmail.instance;
  }

  public async sendMail(emailClient: string, attachments: MessageQueue["attachments"]): Promise<any> {
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

    const name = "Luan";

    let content = await ejs.renderFile("./src/emailTemplate/email.ejs", { name: name });

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
