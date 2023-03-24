const express = require("express");

const app = express();
const http = require("http").createServer(app);

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log(`Server is running on the port http://localhost:${PORT}/`);
});

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const socket = require("socket.io")(http);

socket.on("connection", (socket) => {
  console.log("Connnected");
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});
