import { MessageQueue } from "./src/datatype/messageQueue";
import connection from "./src/lib/rabbitmq.config";
import MailFactory from "./src/mail/mailFactory";
const QUEUE_NAME = "sendMail";

function main() {
  const mailFactory: MailFactory = new MailFactory();
  connection.then(async (conn) => {
    const channel = await conn.createChannel();
    channel.consume(QUEUE_NAME, (msg) => {
      if (msg) {
        const data: MessageQueue = JSON.parse(msg.content.toString());
        mailFactory.getMailServer().sendMail(data.email, data.attachments);
        channel.ack(msg);
      }
    });
  });
}

main();
