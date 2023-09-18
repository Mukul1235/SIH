const mongoose = require("mongoose");
const app = require("./app");
const colors = require("colors");
const ProfileRouter = require("./controllers/ProfileRouter");
const cors = require("cors");
const Message = require("./model/Message");
const { User } = require("./model/userModel");
const ConversationRouter = require("./controllers/conversation");
const MessageRouter = require("./controllers/message");
app.use(cors());
mongoose.set("strictQuery", true);

mongoose
  .connect(
    process.env.DB ||
      "mongodb+srv://nitin:nitin@cluster0.og3ncih.mongodb.net/test"
  )
  .then(() => {
    console.log("Connected".red.bold);
  })
  .catch((err) => {
    console.log(err);
  });

const port = 5001;

app.use("/profile", ProfileRouter);
app.use("/conversation", ConversationRouter);
app.use("/messages", MessageRouter);

//CHAT
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

app.get("/rooms", (req, res) => {
  res.json(rooms);
});

function getLastMessagesfromRoom(room) {
  let roomMessage = Message.aggregate([
    { $match: { to: room } },
    { $group: { _id: "$date", messagesByDate: { $push: "$$ROOT" } } },
  ]);
  return roomMessage;
}

// 02/11/2022
function sortRoomMessagesByDate(messages) {
  return messages.sort(function (a, b) {
    let date1 = a._id.split("/");
    let date2 = a._id.split("/");
    date1 = date1[2] + date1[0] + date1[1];
    date2 = date2[2] + date2[0] + date2[1];

    return date1 < date2 ? -1 : 1;
  });
}

let users = [];
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
  //SEND AND GET MESSAGES
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //WHEN DISCONNECT
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(port, () => {
  console.log(`App Listening on http://localhost:${port}/`.blue.bold);
});
