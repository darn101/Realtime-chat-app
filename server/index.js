const express = require("express");
const cors = require("cors");
const { connection } = require("./database/db");
const UserRoutes = require('./routes/UserRoutes');
const MessageRoute = require('./routes/MessageRoute');
const socket = require('socket.io');

const app = express();


require("dotenv").config();
connection();
app.use(cors());
app.use(express.json());

app.use('/api/auth', UserRoutes);
app.use('/api/message', MessageRoute);


const server = app.listen(process.env.PORT, () => {
    console.log('Server is running on Port', process.env.PORT);
})

//SOCKET ---------------------

const io = socket(server, {
    cors: {
        origin: "https://chat-zone-five.vercel.app/",
        credentials: true
    }
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        console.log(data);
        console.log(onlineUsers);
        const sendUserSocket = onlineUsers.get(data.to);
        console.log(sendUserSocket);
        if (sendUserSocket) {
            console.log('inside');
            const res = socket.to(sendUserSocket).emit("msg-recieve", data.message);
            console.log(res);
        }
    });
});