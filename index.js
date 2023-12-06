var mongoose = require("mongoose");
const emoji = require("node-emoji");
const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const history = require("connect-history-api-fallback");
require("dotenv").config();
const morgan = require("morgan");
var config = require("./config");

var app = express();
app.use(morgan("dev"));

app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);
app.use(
  session({
    secret: "kanbantReallySecretKey",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const strategies = require("./strategies")(passport);

const router = new express.Router();
router.use("/api", require("./routes/api"));
router.use("/auth", require("./routes/auth"));
router.use("/user", require("./routes/user"));
app.use(router);

const staticFileMiddleware = express.static("./public");

app.use(staticFileMiddleware);

app.use(history());

app.use(staticFileMiddleware);
mongoose
  .connect(config.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((err) => {
    console.log(
      `${emoji.get(":x:")} Error connecting to MongoDB.\n${emoji.get(
        ":envelope:"
      )}  Error Message: ${err.message}`
    );
  });

mongoose.connection.on("connected", (res) => {
  console.log(process.env.MONGO_DB_URI);
  console.log(
    `${emoji.get(
      ":heavy_check_mark:"
    )}  MongoDB connection is successfully established.`
  );
  app.listen(config.PORT, () => {
    console.log(
      `${emoji.get(":heavy_check_mark:")}  Kanbant listening at ${config.URL}`
    );
  });
});

mongoose.connection.on("disconnected", (res) => {
  console.log(
    `${emoji.get(
      ":warning:"
    )}  MongoDB default connection has been disconnected`
  );
});
