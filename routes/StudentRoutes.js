const express = require("express");
var multerS3 = require('multer-s3'); //s3
var aws = require('aws-sdk') //s3

var multer = require('multer')

const AdminStudent = require('../controllers/admin/StudentController.js');
const Student = require('../controllers/student/StudentController.js');
const checkAuth = require("../middleware/check-auth.js");

var s3 = new aws.S3({secretAccessKey: process.env.awsAcessSecret,
    accessKeyId: process.env.awsAccessKey,
    region: process.env.awsRegion}) //s3

// var storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     fileFilter: function(req, file, cb) {
//         console.log(file.mimetype, "dadasd")
//     },
//     filename: function(req, file, cb) {
//         // console.log(file)
//         cb(null, file.originalname)
//     },
// })

//s3
var storage =  multerS3({
    s3: s3,
    bucket: 'crazyforstudy',
    metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
        file.filename = file.originalname
        cb(null, "uploads/" + file.originalname)
    }
})

var upload = multer({ storage: storage })

const router = express.Router();

router
    .get('/modify-notification',Student.modifyNotification)
    .get('/all/:pageno/:limit',checkAuth, AdminStudent.getAllStudents)
    .post('/ask-question',upload.fields([{name:'image0'},{name:'image1'},{name:'image2'}]),checkAuth, Student.askQuestion)
    .get('/user-question/:flag?',checkAuth, Student.userQuestion)
    .get('/user-notify/:isRead?',checkAuth, Student.userNotifications)
    .patch('/update-notification/:id',checkAuth, Student.readNotifications)
    .post('/check-book-isbn',checkAuth,Student.checkBookIsbn)
    .get('/my-textbook',checkAuth, Student.myTextBook)
    .get('/my-subscription-details', checkAuth, Student.mySubscription)
    .post('/my-textbook-del', checkAuth, Student.deleteTextBook)
    .post('/ask-already-present-question', checkAuth, Student.askAlreadyPQuestion)
    .get('/get-college-textbooks/:filter/:pageno/:limit',checkAuth, AdminStudent.getAllCollegeTextBooks)
;

module.exports = router;