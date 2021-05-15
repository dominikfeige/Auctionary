import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import userRoutes from './routes/userRoutes.js'
import auctionRoutes from './routes/auctionRoutes.js'

// .env Variables from .env
dotenv.config()

// Connection to Database
connectDB()

const app = express()

// Body parser for json body
app.use(express.json())

// Routes Import
app.use('/api/users', userRoutes)
app.use('/api/auctions', auctionRoutes)

// Error Handler
app.use(notFound)
app.use(errorHandler)

// Port node Server
const PORT = process.env.PORT || 5000

// Server start
app.listen(
  PORT,
  console.log(
    `Der Server läuft im ${process.env.NODE_ENV} Modus auf Port ${PORT}`.cyan
      .bold
  )
)
