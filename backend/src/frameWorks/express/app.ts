import express from "express";
import http from "http";
import dotenv from "dotenv";
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
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: config.CORS_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
  },
  pingTimeout: 60000,
  pingInterval: 25000,
  transports: ["websocket", "polling"],
});

dotenv.config();

const rooms = new Map();

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("joinRoom", (roomId: string) => {
    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Set());
    }
    rooms.get(roomId)?.add(socket.id);
    socket.join(roomId);
    socket.to(roomId).emit("userJoined", socket.id);
    console.log(rooms);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  socket.on("offer", ({ roomId, offer, userId }) => {
    socket.to(roomId).emit("offer", { offer, userId: socket.id });
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  socket.on("answer", ({ roomId, answer, userId }) => {
    socket.to(roomId).emit("answer", { answer, userId: socket.id });
  });

  socket.on("candidate", ({ roomId, candidate, userId }) => {
    const otherUsers = [...(rooms.get(roomId) || new Set())].filter(
      (id) => id !== userId
    );

    console.log(otherUsers, "IS THE other user");
    socket.to(roomId).emit("candidate", { candidate, userId: socket.id });
  });

  socket.on("message", ({ roomId, message, userId }) => {
    const messageData = {
      message: message,
      sender: userId,
    };
    io.to(roomId).emit("message", messageData);
  });

  socket?.on("isTyping", ({ roomId, userId }) => {
    const typingAction = {
      action: "message",
      sender: userId,
    };
    io.to(roomId).emit("isTyping", typingAction);
  });

  socket?.on("cutCall", ({ roomId, userId }) => {
    socket.to(roomId).emit("callHungUp", { userId });
  });

  socket.on("disconnect", () => {
    rooms.forEach((participants, roomId) => {
      if (participants.has(socket.id)) {
        participants.delete(socket.id);
        socket.to(roomId).emit("userLeft", socket.id);
        if (participants.size === 0) {
          rooms.delete(roomId);
        }
      }
    });

    console.log(`User disconnected: ${socket.id}`);
  });
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(apiLimiter);
routes(app);
connectToDatabase();
app.use(errorHandler);

server.listen(config.PORT, () => {
  console.log(`server is running on port ${config.PORT}`);
});
