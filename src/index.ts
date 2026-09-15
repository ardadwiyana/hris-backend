import express from "express";
import cors from "cors";
import hrisRoutes from "./routes/hris.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// Daftarkan Rute API
app.use("/api", hrisRoutes);

app.get("/", (req, res) => {
  res.json({ message: "HRIS Production-Ready API is running!" });
});

// Wajib diletakkan di baris terakhir sebelum app.listen
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server aktif di http://localhost:${PORT}`);
});