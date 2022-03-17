export class MessageQueue {
  type!: string;
  email!: string;
  attachments!: {
    filename: string;
    content: any;
  }[];
}
