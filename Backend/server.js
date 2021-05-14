import express from 'express'

const app = express()

app.use(express.json())

const PORT = 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
