const express = require("express");
var multerS3 = require('multer-s3'); //s3
var aws = require('aws-sdk') //s3

var multer = require('multer')

const Assignment = require('../controllers/admin/AssignmentController.js');
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

router.get('/get-assignment-all/:filter?/:subject?/:sub_subject?/:page?/:limit?',  checkAuth, Assignment.getAssignmentAll);
router.get('/single-question-assignment/:id?', checkAuth, Assignment.getSingleAssignment);
router.patch('/update-answer-assignment/:id?',upload.fields([{name:'file1'},{name:'file2'}]), checkAuth, Assignment.updateSingleAssignment);

module.exports = router;