import express from "express";
import http from "http";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import { corsOptions } from "../config/corsConfig";
import { connectToDatabase } from "../database/mongoDbCongig";
import { config } from "../config/envConfig";
import routes from "./routers/routers";
import { errorHandler } from "../middleware/errorHandiler";
import helmet from "helmet";
import morgan from "morgan";
import { apiLimiter } from "../config/rateLimit";
import { Server, Socket } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

dotenv.config();

const rooms = new Map();

// const rooms = new Map<string, Set<string>>();

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("joinRoom", (roomId: string) => {
    // Create room if it doesn't exist
    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Set());
    }

    // Add user to room
    rooms.get(roomId)?.add(socket.id);
    socket.join(roomId);

    // Notify others in room
    console.log(roomId, "is hte join Room id");
    console.log(socket.id, "is hte join socket id");
    socket.to(roomId).emit("userJoined", socket.id);
    console.log(rooms);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on("offer", ({ roomId, offer, userId }) => {
    console.log("roomId:", roomId);
    console.log("offer:", offer);
    console.log("userId:", userId);
    console.log(rooms);
    console.log(socket.id, "is the send to sokcet Id");
    socket.to(roomId).emit("offer", { offer, userId: socket.id });
  });

  socket.on("answer", ({ roomId, answer, userId }) => {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log("answer Id", userId);
    console.log("answer ", answer);
    socket.to(roomId).emit("answer", { answer, userId: socket.id });
  });

  socket.on("candidate", ({ roomId, candidate, userId }) => {
    // console.log("on candidate :", candidate);
    console.log("on candidate :", roomId);
    console.log("on candidate :", userId);
    console.log(rooms, "is the rooms");
    socket.to(roomId).emit("candidate", { candidate, userId });
  });

  socket.on("message", ({ roomId, message, userId }) => {
    console.log(userId);
    console.log("message:", message);
    const messageData = {
      message: message,
      sender: userId,
    };
    io.to(roomId).emit("message", messageData);
  });
  socket?.on("isTyping", ({ roomId }) => {
    io.to(roomId).emit("isTyping");
  });
  socket.on("disconnect", () => {
    // Remove user from all rooms they were in
    rooms.forEach((participants, roomId) => {
      if (participants.has(socket.id)) {
        participants.delete(socket.id);
        socket.to(roomId).emit("userLeft", socket.id);

        // Clean up empty rooms
        if (participants.size === 0) {
          rooms.delete(roomId);
        }
      }
    });

    console.log(`User disconnected: ${socket.id}`);
  });
});
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

// app.use(apiLimiter);
routes(app);
connectToDatabase();
app.use(errorHandler);

server.listen(config.PORT, () => {
  console.log(`server is running on port ${config.PORT}`);
});
