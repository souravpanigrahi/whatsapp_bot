const qrcode = require("qrcode-terminal");
const { Client } = require("whatsapp-web.js");

// setting up the whatsapp client
const client = new Client();

// generating the qr code
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

// authentication failure
client.on("auth_failure", (msg) => {
  console.error("AUTHENTICATION FAILURE", msg);
});

client.on("ready", () => {
  console.log("Client is ready!");
  client.getChats().then((chats) => {
    //will display the first whatsapp chat in your application
    //console.log(chats[0]);
    //
    //
    /* For finding a specific chat and replying over and scheduling messages */
    const myGroup = chats.find((chat) => chat.name === "Hey Fam");
    console.log(myGroup);
    console.log("I have scheduled a message");
    setTimeout(() => {
      client.sendMessage(
        "Hello this is a timed message"
      );
    }, 20000);
  });
});
client.on("message", (message) => {
  if (message.body === "!ping") {
    client.sendMessage(message.from, "pong");
  }
});

client.initialize();
