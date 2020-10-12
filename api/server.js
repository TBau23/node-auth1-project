const express = require('express')
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");


const server = express();
const UsersRouter = require("../users/usersRouter.js");
const AuthRouter = require("../auth/authRouter.js");
const protected = require("../auth/protected-mw.js");

// session config goes here
const sessionConfiguration = {
    name: "le_cookie", // Cookie name, will default to SID
    secret: process.env.SESSION_SECRET || "these violent delights have violent ends",
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 10,
        secure: process.env.SECURE_COOKIES || false // this should be true at production
    },
    resave: true,
    saveUninitialized: true
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfiguration));

server.use('/api/auth', AuthRouter);
server.use('/api/users', protected, UsersRouter);

server.get("/", (req, res) => {
    res.json({api: "is up and COOKING", session: req.session});

})

module.exports = server;