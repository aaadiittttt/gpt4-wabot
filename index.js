const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason
} = require("@whiskeysockets/baileys");
const fs = require("fs");
const path = require("path");

const startSock = async () => {
  const { state, saveCreds } = await useMultiFileAuthState("./session");

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    browser: ["Ubuntu", "Chrome", "110.0"],
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect, pairingCode } = update;
    if (pairingCode) {console.log(`🔐 Pairing Code: pairingCode`);
    
    if (connection === "close") 
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) startSock();
    );

  sock.ev.on("messages.upsert", async (msg) => 
    const m = msg.messages[0];
    if (!m.message || m.key.fromMe) return;

    const from = m.key.remoteJid;
    const text =
      m.message.conversation ||
      m.message.extendedTextMessage?.text;

    if (!text) return;

    // Load command files
    const commandFiles = fs
      .readdirSync(path.join(__dirname, "commands"))
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) 
      const command = require(`./commands/{file}`);
      if (text.toLowerCase() === command.name) {
        return command.run(sock, m, from);
      }
    }
  });
};

startSock();