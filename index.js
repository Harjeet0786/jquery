require("./bin/kernel");
// let serverless = require("serverless-http");
let express = require("express");
let path = require("path");
let logger = require("morgan");
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')
  (server, { cors: { origin: "*" } })
let cookieParser = require("cookie-parser");
let webRoutes = require("./routes/web");
let apiRoutes = require("./routes/api");
// Import the library:
let cors = require("cors");

// view engine setup
app.set("views", path.join(__dirname, "resources/views"));
app.set("view engine", "twig"); // either pug,twig etc

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/js", express.static(path.join(__dirname, "public/javascripts")));
app.use("/css", express.static(path.join(__dirname, "public/stylesheets")));
app.use("/images", express.static(path.join(__dirname, "public/images")));
// Then use it before your routes are set up:
app.set('trust proxy', true);
app.use(cors());
app.use("/", webRoutes);
app.use("/api/v1/", apiRoutes);

const formatMessage = require("./utils/messages");
const {
  userJoin,
  getCurrentUser,
  getRoomUsers,
  userLeave,
} = require("./utils/users");

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next({
    status: 404,
    message: "Not Found"
  });
});

// socket 
const botName = "ChatRoom Bot";



io.on("connection", (socket) => {
  console.log("socket is connected", socket.id);

  socket.on("joinRoom", async ({ username, room }) => {
    const user = await userJoin(socket.id, username, room);
    socket.join(user.room);

    // welcome current user
    socket.emit("message", formatMessage(botName, "Welcome to chatroom!"));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined the chat`)

      )

    // send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: await getRoomUsers(user.room)
    });
  });

  // listen for chat messages
  socket.on("chatMessage", async (msg) => {
    console.log("listen enent from serve", msg)
    const user = await getCurrentUser(socket.id);
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });





  // run when client disconnects
  socket.on("disconnect", async () => {
    const user = await userLeave(socket.id);
    console.log("User Response", user)
    if (user) {
      console.log("Testsgdgdsfg!!!!!", user.room)
      io.to(user.room).emit("message", formatMessage(botName, `${user.username} has left the chat`));
    }

    // send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: await getRoomUsers(user.room)
    });
  });

});

// error handler
app.use((err, req, res, next) => {
  if (err.status === 404) {
    return res.status(400).render("errors/404");
  }

  if (err.status === 500) {
    return res.status(500).render("errors/500");
  }
  next();
});

server.listen(3000, () => {
  console.log("Surver is running ...")
});