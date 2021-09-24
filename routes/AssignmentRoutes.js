const express = require("express");
var multerS3 = require('multer-s3'); //s3
var aws = require('aws-sdk') //s3

var multer = require('multer')

const Assignment = require('../controllers/web/AssignmentController');
const studentAuth = require("../middleware/student-auth");

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
    // .get('/all/:pageno/:limit',checkAuth, AdminStudent.getAllStudents)
    .post('/save-assignment', upload.fields([{name:'image0'},{name:'image1'},{name:'image2'}]), studentAuth, Assignment.saveAssignmentOne)
    .put('/save-assignment2', studentAuth, Assignment.saveAssignmentTwo)
    .post('/save-local-assignment',upload.fields([{name:'image0'},{name:'image1'},{name:'image2'}]), studentAuth, Assignment.saveAssignmentLocal)
    .post('/get-assignment-info', studentAuth, Assignment.getAssignmentInfo)
    .post('/get-assignment-all', studentAuth, Assignment.getAssignmentAll)
;

module.exports = router;