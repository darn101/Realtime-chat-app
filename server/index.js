const express = require("express");
const cors = require("cors");
const { connection } = require("./database/db");
const UserRoutes = require('./routes/UserRoutes');
const MessageRoute = require('./routes/MessageRoute');
const socket = require('socket.io');

const app = express();

const corsOptions = {
    origin: ['https://chat-zone-app.vercel.app'],
    methods: ["GET", "POST"],
    credentials: true
};

require("dotenv").config();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://chat-zone-app.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials
    next();
});

app.use(cors(corsOptions));
app.use(express.json());

connection();
app.use('/api/auth', UserRoutes);
app.use('/api/message', MessageRoute);

app.options('/api/auth/login', cors());

const server = app.listen(8000, () => {
    console.log('Server is running on Port', 8000);
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
