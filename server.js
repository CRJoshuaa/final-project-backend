const cryptoNews = require("./services/cryptoNews");
const cryptoInfo = require("./services/cryptoInfo");
const { instrument } = require("@socket.io/admin-ui");

const PORT = process.env.PORT || 3001;

const io = require("socket.io")(PORT, {
  cors: {
    origin: [
      "https://admin.socket.io/",
      "http://localhost:3000",
      "https://besquare-final-project.web.app",
    ],
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

  //request for crypto history
  socket.on("request-crypto-history", async (coinId, timePeriod) => {
    console.log("crypto history requested");
    const response = await cryptoInfo.getCryptoHistory(coinId, timePeriod);
    socket.emit("response-crypto-history", response);
  });

  //request for crypto details
  socket.on("request-crypto-details", async (coinId) => {
    console.log("crypto details requested");
    const response = await cryptoInfo.getCryptoDetails(coinId);
    socket.emit("response-crypto-details", response);
  });
});

instrument(io, { auth: false });
