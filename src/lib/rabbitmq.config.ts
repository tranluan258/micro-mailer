import amqplib from "amqplib";

const stopProgram = (err: any) => {
  console.error(err);
  process.exit(1);
};

const connectionConfig = {
  protocol: "amqp",
  hostname: "localhost",
  port: 5672,
  username: "guest",
  password: "guest",
  locale: "en_US",
  frameMax: 0,
  heartbeat: 0,
  vhost: "/",
};

const connection = amqplib.connect(connectionConfig, (err: any, conn: any) => {
  if (err) stopProgram(err);
});

export default connection;
