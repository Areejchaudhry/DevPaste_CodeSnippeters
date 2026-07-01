import express from "express";
import cors from "cors";
import userRoutes from "./routes/UserRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// User Routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("DevPaste Backend is Running...");
});

export default app;