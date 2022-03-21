import IMail from "./IMail";
import nodemailer from "nodemailer";
import "dotenv/config";
import { MessageQueue } from "../datatype/messageQueue";
import ejs from "ejs";

const { HOST_OUTLOOK, PASSWORD_OUTLOOK } = process.env;

type transporter = nodemailer.Transporter;

class SendWithICloud implements IMail {
  private static instance: SendWithICloud;
  private transporter: transporter;
  private constructor(transporter: transporter) {
    this.transporter = transporter;
  }

  public static getInstance(): SendWithICloud {
    if (!SendWithICloud.instance) {
      let account = nodemailer.createTestAccount();
      let transporter: transporter = nodemailer.createTransport({
        // host: "smtp.office365.com",
        service: "Outlook365",
        port: 465,
        secure: true,
        auth: {
          user: HOST_OUTLOOK,
          pass: PASSWORD_OUTLOOK,
        },
      });

      SendWithICloud.instance = new SendWithICloud(transporter);
    }

    return SendWithICloud.instance;
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
