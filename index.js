const express = require('express')
const dbConnect = require("./db");
const PORT = 3000;
const app = express();
const authRoutes = require('./routes/auth')
const refreshRoutes = require('./routes/refreshToken')
const checkRouter = require('./routes/check')
const methodRouter = require('./routes/method')

const colors = require('colors')
const SERVER_PORT = 3000
const SERVER_IP = '127.0.0.1'



dbConnect()


app.use("/api", authRoutes)
app.use("/refresh", refreshRoutes)
app.use("/check", checkRouter)
app.use("/method", methodRouter)


app.listen(SERVER_PORT, SERVER_IP, ()=> {
    console.log(`Server started at ${SERVER_IP} with port ${SERVER_PORT}`.bgGreen.white)
})