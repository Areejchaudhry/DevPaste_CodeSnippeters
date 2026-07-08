import express from "express";
import cors from "cors";
import userRoutes from "./routes/UserRoutes.js";
import snippetRoutes from "./routes/SnippetRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// User Routes
app.use("/api/users", userRoutes);
// snippet routes
app.use("/api/snippets", snippetRoutes);

app.get("/", (req, res) => {
    res.send("DevPaste Backend is Running...");
});

export default app;