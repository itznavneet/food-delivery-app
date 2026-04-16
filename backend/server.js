import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import connectCloudinary from './config/cloudinary.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// app config
const app = express()
const port = process.env.PORT || 4000

// middleware
app.use(express.json())

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    process.env.FRONTEND_URL,
    process.env.ADMIN_URL
  ].filter(Boolean),
  credentials: true
}))

// db connection
connectDB()
connectCloudinary()

// api endpoints
app.use("/api/food", foodRouter)
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

// NOTE: /images static route can be removed later if all images are on Cloudinary
// app.use('/images', express.static('uploads'))

app.get('/', (req, res) => {
  res.send("API working")
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})