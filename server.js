import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import http from "http";
import { Server } from "socket.io";
import session from "express-session";
import Connection from "./src/Config/Connection.js";
import flash from "connect-flash";
import MongoDBStore from "connect-mongodb-session";
import passport from "passport";

// ROUTES
import ErrorRoute from "./src/Router/404.js";
import UserRouter from "./src/Router/UserRouter.js";
import AdminRouter from "./src/Router/AdminRouter.js";
import AuthRouter from "./src/Router/AuthRouter.js";

// Middleware
import ErrorsMiddleware from "./src/Middleware/ErrorsMiddleware.js";
import socketConnection from "./socketTest.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
dotenv.config();
const store = MongoDBStore(session);

// socketConnection(io)

/// db connection
Connection();

// middleware
app.use(morgan("tiny"));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION__SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: new store({
      uri: process.env.DB_URL,
      collection: "sessions",
    }),
  })
);
app.use(bodyParser.json());
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.login_error = req.flash("login_error");
  next();
});


// Routes
app.use("/api/user", UserRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/auth", AuthRouter);

app.use(ErrorRoute);

//Custom middleware
app.use(ErrorsMiddleware);

app.listen(process.env.PORT || 4000, function () {
  console.log(
    "Listening on port on http://localhost:" + process.env.PORT + " ..."
  );
});
