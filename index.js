const OS = require("os");
const cluster = require("cluster");
let numCPUs = OS.cpus().length;
const fs = require("fs");
const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const Routes = require("./routes/index.js");
const WebRoutes = require("./routes/web-routes.js");
const TutorRoutes = require("./routes/tutor-routes.js");

const cronJob = require("cron").CronJob;
const { cfsCronTask } = require("./cfsCronTask.js");
const responseTime = require("response-time");

const app = express();

//for mongodb backup
const { spawn } = require("child_process");
// const path = require('path');
// const cronJob = require('cron').CronJob;

const DB_NAME = "crazyForStudy";
const DB_HOST = "65.0.252.57";
const DB_PORT = "27017";
const DB_USERNAME = "cfsadmin";
const DB_PASSWORD = "37cjK5tYZNvguXSw";
const DB_AUTHENTICATIONDB = "admin";
const ARCHIVE_PATH = path.join(__dirname, "backup", `${DB_NAME}.gzip`);
var backupJob = new cronJob({
  cronTime: "0 0 * * 0", // 0 0 * * 0   once a week             // */5 * * * * *  every 5 seconds
  onTick: function () {
    backupMongoDB();
  },
  start: false,
  timeZone: "Asia/Kolkata",
});
backupJob.start();

function uploadToS3() {
  var aws = require("aws-sdk"); //s3
  const fs = require("fs");
  var s3 = new aws.S3({
    secretAccessKey: process.env.awsAcessSecret,
    accessKeyId: process.env.awsAccessKey,
    region: process.env.awsRegion,
  }); //s3

  // var params = {
  //     Bucket : process.env.awsS3Bucket, /* Another bucket working fine */
  //     CopySource : ARCHIVE_PATH, /* required */
  //     Key : DB_NAME, /* required */
  //     ACL : 'public-read',
  // };

  const fileContent = fs.readFileSync(ARCHIVE_PATH);
  const params = {
    Bucket: process.env.awsS3Bucket,
    Key: DB_NAME + ".gzip", // File name you want to save as in S3
    Body: fileContent,
  };

  s3.upload(params, function (err, data) {
    if (err) console.log(err, err);
    // an error occurred
    else {
      console.log(data); // successful response
    }
  });
}

function backupMongoDB() {
  const child = spawn("mongodump", [
    `--db=${DB_NAME}`,
    `--host=${DB_HOST}`,
    `--port=${DB_PORT}`,
    `--username=${DB_USERNAME}`,
    `--password=${DB_PASSWORD}`,
    `--authenticationDatabase=${DB_AUTHENTICATIONDB}`,
    `--archive=${ARCHIVE_PATH}`,
    "--gzip",
  ]);

  child.stdout.on("data", (data) => {
    console.log("stdout:\n", data);
  });

  child.stderr.on("data", (data) => {
    console.log("stderr:\n", Buffer.from(data).toString());
  });

  child.on("error", (error) => {
    console.log("error:\n", error);
  });

  child.on("exit", (code, signal) => {
    if (code) console.log("Process exit with code:", code);
    else if (signal) console.log("Process killed with signal:", signal);
    else {
      console.log("Backup is successfull ✅");
      uploadToS3();
    }
  });
}

app.use(responseTime());
/* Cron Task */
var job = new cronJob({
  cronTime: "00 05 00 * * *",
  onTick: function () {
    cfsCronTask();
  },
  start: false,
  timeZone: "Asia/Kolkata",
});
job.start();

app.use(cors());
const PORT = process.env.PORT || 8080;

app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }));

const flash = require("connect-flash");
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

// express session
app.use(
  session({
    secret: "acadecraft-secerate",
    resave: true,
    saveUninitialized: true,
  })
);
// connect flash session
app.use(flash());

// global vars session
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// DB Cofiguration
const options = {
  useUnifiedTopology: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useCreateIndex: true,
};

(async () => {
  const MONGO_URI = process.env.MONGO_URI;
  await mongoose
    .connect(MONGO_URI, options)
    .then(() => {
      console.log(`Mongo DB Connected`);
      if (process.env.NODE_ENV === "production") {
        if (cluster.isMaster) {
          console.log("Master cluster setting up " + numCPUs + " workers...");
          for (var i = 0; i < numCPUs; i++) {
            cluster.fork();
          }
          cluster.on("online", function (worker) {
            console.log("Worker " + worker.process.pid + " is online");
          });
          cluster.on("exit", function (worker, code, signal) {
            console.log("Worker " + worker.process.pid + " died.");
            console.log(
              "Starting a new worker with new pid " + worker.process.pid
            );
            cluster.fork();
          });
        } else {
          process.env.UV_THREADPOOL_SIZE = numCPUs;
          app.listen(PORT, () => {
            console.log(`App is running pid ${process.pid} on PORT ${PORT}`);
          });
        }
      } else {
        process.env.UV_THREADPOOL_SIZE = numCPUs;
        app.listen(PORT, () => {
          console.log(`App is running pid ${process.pid} on PORT ${PORT}`);
        });
      }
    })
    .catch((err) => console.log(err));
})();

app.get("/api/v1/test", (req, res) => {
  let today = new Date();
  res.status(res.statusCode).json({
    status: res.statusCode,
    message: `Server OK Ronning @ ${today}`,
  });
});

// login
app.use("/api/v1/admin", Routes.AdminAuthRoutes);
app.use("/api/v1/master-role", Routes.roleRoutes);
app.use("/api/v1/master-module", Routes.moduleRoutes);
app.use("/api/v1/master-role-module", Routes.roleModuleRoutes);
app.use("/api/v1/role-module", Routes.roleModuleRoutes);
app.use("/api/v1/master-admin", Routes.adminRoutes);
app.use("/api/v1/master-delete", Routes.removeDataRoutes);
app.use("/api/v1/subject", Routes.subjectRoutes);
app.use("/api/v1/sub-subject", Routes.SubSubjectRoutes);
app.use("/api/v1/chield-subject", Routes.ChieldSubjectRoutes);
app.use("/api/v1/books", Routes.BookRoutes);
app.use("/api/v1/chapter", Routes.ChapterRoutes);
app.use("/api/v1/question", Routes.QuestionRoutes);
app.use("/api/v1/student", Routes.StudentRoutes);
app.use("/api/v1/tutor", Routes.TutorRoutes);
app.use("/api/v1/faq", Routes.FaqRoutes);
app.use("/api/v1/vendor", Routes.VendorRoutes);
app.use("/api/v1/assignment", Routes.AssignmentRoutes);

app.use("/api/v1/dummy", Routes.DummyRoutes);

app.use("/web/v1/books", WebRoutes.WebBookRoutes);
app.use("/web/v1/reviews", WebRoutes.WebReviewRoutes);
app.use("/web/v1/chapter", WebRoutes.WebChapterRoutes);
app.use("/web/v1/faq", WebRoutes.WebFaqRoutes);
app.use("/web/v1/category", WebRoutes.CategoryRoutes);
app.use("/web/v1/student", WebRoutes.StudentAuthRoutes);
app.use("/web/v1/student", WebRoutes.StudentRoutes);
app.use("/web/v1/payment", WebRoutes.WebPaymentRoutes);
app.use("/web/v1/assignment", WebRoutes.WebAssignmentRoutes);

// app.use("/web/v1/tutor", WebRoutes.TutorAuthRoutes);
app.use("/web/v1/subject", WebRoutes.WebSubjectRoutes);
app.use("/web/v1/subsubject", WebRoutes.WebSubjectRoutes);

app.use("/web/v1/question", WebRoutes.WebQuestionRoutes);

app.use("/tutor/v1/auth", TutorRoutes.TutorAuthRoutes);
app.use("/tutor/v1/books", TutorRoutes.TutorBookRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("/*", (req, res) => {
    const index = path.join(__dirname, "build", "index.html");
    res.sendFile(index);
  });
}

app.use("/uploads", express.static("/uploads"));

app.get("/uploads/:name", (req, res) => {
  let root = path.resolve(".");
  let filepath = `${root}/uploads/${req.params.name}`;
  if (fs.existsSync(filepath)) {
    res.download(filepath);
  } else res.sendStatus(404);
});
