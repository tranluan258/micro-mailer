import IMail from "./IMail";
import SendWithGmail from "./SendWithGmail";
import SendWithICloud from "./SendWithICloud";
import ConstTypeEmail from "./ConstTypeEmail";

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
