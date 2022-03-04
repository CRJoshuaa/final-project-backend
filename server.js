const crypto = require("./services/cryptoNews.js");
const { instrument } = require("@socket.io/admin-ui");

const PORT = process.env.PORT || 3001;

const io = require("socket.io")(PORT, {
  cors: {
    origin: ["https://admin.socket.io/", "http://localhost:3000"],
  },
});

const userIo = io.of("/user");
userIo.on("connection", (socket) => {
  console.log("connected to user namespace with username " + socket.username);
});

userIo.use((socket, next) => {
  if (socket.handshake.auth.token) {
    socket.username = getUsernameFromToken(socket.handshake.auth.token);
    next();
  } else {
    next(new Error("Please send token"));
  }
});

const getUsernameFromToken = (token) => {
  return token;
};

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("request-crypto-news", async (category, count) => {
    console.log("crypto-news requested");
    const response = await crypto.getCryptoNews(category, count);

    socket.emit("response-crypto-news", response);
  });
});

instrument(io, { auth: false });
