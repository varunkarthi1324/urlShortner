import express from "express";
import "dotenv/config";
import connectToDB from "./config/db.js";
import urlRouter from "./routes/url.js";
import { redirectToUrl } from "./controllers/Url.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

//CONNECT TO DB
connectToDB();

app.use(express.json());

//API ROUTES
app.get("/", (req, res) => {
  return res.send("Backend is Running!!");
});
app.use(cors());
app.use("/api/url", urlRouter);
app.get("/:shortId", redirectToUrl);

app.listen(PORT, () => {
  console.log("Server started in port:" + PORT);
});
