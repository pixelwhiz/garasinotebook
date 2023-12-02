const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const router = require("./router/Index");

app.use(express.static('db'));
app.use("./db", express.static('db'));

app.use(session({
    secret: `${process.env.SECRET_KEY_SESSION}`,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 3600000000,
    },
}));

const dotenv = require("dotenv");

dotenv.config();

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.SERVER_ADDRESS);
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/api", cors({
    origin: process.env.SERVER_ADDRESS,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);
app.get("/", res.send({ status: true, message: "Welcome" }));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
