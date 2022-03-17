import IMail from "./IMail";
import ConstTypeEmail from "./constTypeEmail";
import SendWithGmail from "./sendWithGmail";
import SendWithICloud from "./sendWithICloud";

class MailFactory {
  public getMailServer({ type }: { type: string }): IMail {
    switch (type) {
      case ConstTypeEmail.GMAIL:
        return SendWithGmail.getInstance();
      case ConstTypeEmail.ICLOUD:
        return SendWithICloud.getInstance();
      default:
        return SendWithGmail.getInstance();
    }
  }
}

export default MailFactory;
