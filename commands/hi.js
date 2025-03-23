module.exports = {
  name: "hi",
  run: async (sock, m, from) => {
    await sock.sendMessage(from, { text: "Hello juga!" });
  },
};