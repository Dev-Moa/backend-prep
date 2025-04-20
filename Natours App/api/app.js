import express from "express";
import morgan from "morgan";
import tourRouter from "./routes/tourRoutes.js"
import userRouter from "./routes/userRoutes.js"
// setup
const app = express();

// middlewares
app.use(morgan('dev'))
app.use(express.json());

// routes
app.use('/api/v1/tours',tourRouter)
app.use('/api/v1/Users',userRouter)

export default app