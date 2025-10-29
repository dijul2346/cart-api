import express from "express";
import cors from "cors";
import cartRoutes from "./routes/cartRoutes";
import userRoutes from "./routes/userRoutes";
import { connectDB } from "./db/connect";
import { setupSwagger } from "./config/swagger";


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
setupSwagger(app);
connectDB();

app.use("/users", userRoutes);
app.use("/cart", cartRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
