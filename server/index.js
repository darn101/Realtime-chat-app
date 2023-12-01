const express = require("express");
const cors = require("cors");
const { connection } = require("./database/db");
const UserRoutes = require('./routes/UserRoutes');
const MessageRoute = require('./routes/MessageRoute');
const socket = require('socket.io');

const app = express();

const corsOptions = {
    origin: 'https://chat-zone-app.vercel.app',
    optionsSuccessStatus: 200,
};

require("dotenv").config();
connection();
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', UserRoutes);
app.use('/api/message', MessageRoute);



const server = app.listen('https://chat-zone-app.vercel.app', () => {
    console.log('Server is running on Port', 'https://chat-zone-app.vercel.app');
})

//SOCKET ---------------------

const io = socket(server, {
    cors: {
        origin: "https://chat-zone-app.vercel.app",
        methods: ["GET", "POST"],
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
