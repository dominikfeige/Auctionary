import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import userRoutes from './routes/userRoutes.js'
import auctionRoutes from './routes/auctionRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

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
app.use('/api/upload', uploadRoutes)

//Upload Handlers
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('Auctionary API ist gestartet....')
  })
}

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
