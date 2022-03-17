import { MessageQueue } from "../datatype/messageQueue";
import IMail from "./IMail";
import nodemailer from "nodemailer";
import "dotenv/config";
import fs from "fs";
import ejs from "ejs";

const { EMAIL_ADMIN, PASSWORD_EMAIL } = process.env;
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

    // let contentHtml = fs.readFileSync("./src/emailTemplate/email.");

    // let content: string = `
    //     <div style="padding: 10px; background-color: white;">
    //         Hello ${emailClient}
    //     </div>
    //     `;

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
