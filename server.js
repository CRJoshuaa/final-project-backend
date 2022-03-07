const cryptoNews = require("./services/cryptoNews");
const cryptoInfo = require("./services/cryptoInfo");
const { instrument } = require("@socket.io/admin-ui");
const res = require("express/lib/response");
const { createModifiersFromModifierFlags } = require("typescript");

const PORT = process.env.PORT || 3001;

const io = require("socket.io")(PORT, {
  cors: {
    origin: ["https://admin.socket.io/", "http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  // request for crypto news
  socket.on("request-crypto-news", async (category, count) => {
    console.log("crypto-news requested");
    const response = await cryptoNews.getCryptoNews(category, count);
    socket.emit("response-crypto-news", response);
  });

  //request for crypto information
  socket.on("request-crypto", async (count) => {
    console.log("crypto requested");
    const response = await cryptoInfo.getCryptos(count);
    socket.emit("response-crypto", response);
  });
});

instrument(io, { auth: false });
