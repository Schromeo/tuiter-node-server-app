import express from 'express';
import cors from "cors";
import session from "express-session"
import HelloController from "./controllers/hello-controller.js"
import UserController from "./users/users-controller.js"
import TuitsController from "./controllers/tuits/tuits-controller.js"
import AuthController from "./users/auth-controller.js"
import mongoose from "mongoose"
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/tuiter'
mongoose.connect(CONNECTION_STRING);

const app = express()

app.use(session({
    secret: "any string",
    resave: false,
    saveUninitialized: true,
}))
app.use(cors({
    credentials: true,
    origin: process.env.NODE_ENV === 'production' ? ['https://a5--endearing-taffy-7c4b2f.netlify.app', 'https://tuiter-node-server-app-8j8n.onrender.com'] : "http://localhost:3000",
}))
app.use(express.json())
const port = process.env.PORT || 4000;

TuitsController(app)
HelloController(app)
UserController(app)
AuthController(app)

app.listen(port, () => {
    console.log(`Server on port ${port}`)
})