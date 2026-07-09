import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import promoRouter from "./routes/promoRoute.js";
import orderRoutes from "./routes/orderRoute.js";
import adminRouter from "./routes/adminRoute.js";
import path from "path";
dotenv.config()

const app = express()
connectDB()
const PORT =  5000
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://food-app-five-ochre-16.vercel.app", // User Frontend
      "https://food-app-t49s.vercel.app",          // Admin
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json())
// app.use(cors())

// //app to
app.use("/food",foodRouter);
 app.use("/images",express.static('uploads'))

app.use("/images", express.static(path.join(process.cwd(), "frontend_assets")));
app.use("/user",userRouter);
app.use("/cart", cartRouter);
app.use("/api/promo", promoRouter);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRouter);


app.get('/', (req, res) => {
  res.send('Backend is running')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})