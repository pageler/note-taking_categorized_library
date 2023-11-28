const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const notes = require("./data/notes");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
dotenv.config();
connectDB();
app.use(express.json()); // convert to json format

app.get("/", (req, res) => {
    res.send("Note Taking Categorize Library API is listening of PORT 5000");
});

app.get("/api/notes", (req, res) => {
    res.json(notes);
});

app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server listening on PORT ${PORT}...`.blue));
