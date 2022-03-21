import IMail from "./IMail";
import SendWithGmail from "./sendWithGmail";
import SendWithOutlook from "./sendWithIOutlook";
import "dotenv/config";
import ConstTypeEmail from "./constTypeEmail";

const { EMAIL_SERVER_TYPE } = process.env;

class MailFactory {
  public getMailServer(): IMail {
    switch (EMAIL_SERVER_TYPE) {
      case ConstTypeEmail.GMAIL:
        return SendWithGmail.getInstance();
      case ConstTypeEmail.OUTLOOK:
        return SendWithOutlook.getInstance();
      default:
        return SendWithGmail.getInstance();
    }
  }
}

export default MailFactory;
