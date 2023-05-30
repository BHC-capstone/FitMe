var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session");
const fs = require("fs");
const https = require("https");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var trainersRouter = require("./routes/trainers");
var manageRouter = require("./routes/manage");
var requestRouter = require("./routes/request");
var calenderRouter = require("./routes/calender");
var trainer_calenderRouter = require("./routes/trainer_calender");
var feedbackRouter = require("./routes/feedback");

const PORT = process.env.PORT || 4000;

var app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

app.use(
    cors({
        origin: "https://localhost:3000",
        methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(
    session({
        secret: "@FitMe",
        resave: false,
        saveUninitialized: true,
        cookie: {
            domain: "localhost",
            path: "/",
            maxAge: 24 * 6 * 60 * 10000,
            sameSite: "none",
            httpOnly: true,
            secure: true,
        },
    })
);

//db

const con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    multipleStatements: true,
});

con.connect(function (err) {
    if (err) throw err;
    console.log("connected");
});

// async function createDB() {
//     try {
//         await fs.readFile("./database/DDL.sql", (err, sql) => {
//             let str = sql.toString();
//             con.query(str, function (err, result) {
//                 if (err) throw err;
//             });
//         });
//     } catch (e) {
//         console.log(e);
//     }
// }

// createDB();

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/trainers", trainersRouter);
app.use("/manage", manageRouter);
app.use("/request", requestRouter);
app.use("/calender", calenderRouter);
app.use("/trainer_calender", trainer_calenderRouter);
app.use("/feedback", feedbackRouter);

let server;
// 인증서 파일들이 존재하는 경우에만 https 프로토콜을 사용하는 서버를 실행
if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
    const option = {
        ca: fs.readFileSync("/etc/letsencrypt/live/fitme.p-e.kr/fullchain.pem"),
        key: fs.readFileSync("/etc/letsencrypt/live/fitme.p-e.kr/privkey.pem"),
        cert: fs.readFileSync("/etc/letsencrypt/live/fitme.p-e.kr/cert.pem"),
    };

    server = https.createServer(option, app).listen(PORT, () => {
        console.log("HTTPS 서버가 실행되었습니다. ");
    });
} else {
    server = app.listen(PORT);
}

//frontend와 연동
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

module.exports = app;
