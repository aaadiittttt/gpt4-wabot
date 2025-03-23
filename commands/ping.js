module.exports = {
  name: "ping",
  run: async (sock, m, from) => {
    await sock.sendMessage(from, { text: "pong!" });
  },
};