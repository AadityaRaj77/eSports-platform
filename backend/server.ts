import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import profileRoutes from "./routes/profile.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

const port = 3000
app.listen(port, () => {
  console.log("Backend running on 3000");
});
