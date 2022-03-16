import IMail from './IMail';
import nodemailer from 'nodemailer';
import 'dotenv/config';
import { MessageQueue } from '../interface/MessageQueue';

const { EMAIL_ADMIN, PASSWORD_EMAIL } = process.env;

class SendWithICloud implements IMail {
  private static instance: SendWithICloud;
  private transporter: nodemailer.Transporter;
  private constructor(transporter: nodemailer.Transporter) {
    this.transporter = transporter;
  }

  public static getInstance(): SendWithICloud {
    if (!SendWithICloud.instance) {
      let transporter = nodemailer.createTransport({
        host: 'smtp.icloud.com',
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

  public sendMail(
    emailClient: string,
    attachments: MessageQueue['attachments']
  ): void {
    let content = ' ';
    content += `
        <div style="padding: 10px; background-color: white;">
            Hello ${emailClient}
        </div>
        `;
    let mailOptions = {
      from: 'Admin',
      to: emailClient,
      subject: 'Send Email',
      html: content,
      attachment: null,
    };

    this.transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      }
    });
  }
}

export default SendWithICloud;
