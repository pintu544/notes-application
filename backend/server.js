import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import noteRoutes from "./routes/noteRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express(); // main thing
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

export { io };
app.use(express.json());

app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

// --------------------------deployment------------------------------
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

httpServer.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`.yellow
      .bold
  )
);
