import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

import router from "./router";
import mongoose from "mongoose";

import socketIo from "socket.io";
import { Server } from "socket.io";
import { initAutomaticLightChange, socketHandler } from "./controllers/sockets";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

server.listen(3001, () => {
  console.log("Server running on http://localhost:3001/");
});

const MONGO_URL =
  "mongodb+srv://dmytrokoblentsit2022:KwtTDgT3ANI9bcls@cluster0.ncimtjo.mongodb.net/?retryWrites=true&w=majority"; // DB URI

mongoose.Promise = Promise;
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use("/", router());
initAutomaticLightChange(io);
socketHandler(io);
