import IMail from "./IMail";
import SendWithGmail from "./SendWithGmail";
import ConstTypeEmail from "./ConstTypeEmail";
import SendWithICloud from "./SendWithICloud";

class MailFactory {
  public getMailServer(type: string): IMail {
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
