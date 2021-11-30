const express =  require("express");
var multerS3 = require('multer-s3'); //s3
var aws = require('aws-sdk') //s3
var multer = require('multer')
const Subject = require('../controllers/admin/SubjectController.js');
const checkAuth =  require("../middleware/check-auth.js");


var s3 = new aws.S3({secretAccessKey: process.env.awsAcessSecret,
    accessKeyId: process.env.awsAccessKey,
    region: process.env.awsRegion}) //s3

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
    .get('/all',checkAuth, Subject.getAllSubject)
    .post('/create',checkAuth, Subject.createSubject)
    .patch('/update/:id',checkAuth,Subject.updateSubject)
    .patch('/update-QA/:id',checkAuth,Subject.updateQASeoSubject)
    .patch('/update-textbook/:id',checkAuth,Subject.updateTextBookSeoSubject)
    .patch('/save-content/:id',checkAuth,Subject.SaveContent)
    .patch('/save-reviews/:id',upload.single('img_path'),checkAuth,Subject.SaveReviews)
    .delete('/delete/:id',checkAuth,Subject.deleteSubject)
    .get('/view/:id',Subject.viewSubject)
    .get('/review/:id',checkAuth,Subject.getReview)
    .get('/content/:id',checkAuth,Subject.getContent)
    .patch('/update-review/:id/:reviewId',upload.single('img_path'),checkAuth,Subject.updateReview)
    .delete('/delete-review/:id/:reviewId',checkAuth,Subject.deleteReview)



    .delete('/delete-review-qa/:id/:reviewId',checkAuth,Subject.deleteReviewQA)
    .get('/review-qa/:id',checkAuth,Subject.getReviewQA)
    .patch('/save-reviews-qa/:id',upload.single('img_path'),checkAuth,Subject.SaveReviewsQA)
    .patch('/save-content-qa/:id',checkAuth,Subject.SaveContentQA)
module.exports = router;