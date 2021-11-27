const express = require("express");
var multerS3 = require('multer-s3'); //s3
var aws = require('aws-sdk') //s3
var multer = require('multer')
const SubSubject = require('../controllers/admin/SubSubjectController.js');
const checkAuth = require("../middleware/check-auth.js");

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
    .get('/subject/:subject_id', SubSubject.AllSubSubject)
    .get('/all', SubSubject.getAllSubSubject)
    .post('/create', checkAuth, SubSubject.createSubSubject)
    .post('/upload', upload.single('file'), checkAuth, SubSubject.uploadSubSubject)
    .patch('/update/:id', SubSubject.updateSubSubject)
    .patch('/update-QA/:id',SubSubject.updateQASeoSubSubject)
    .patch('/update-textbook/:id',SubSubject.updateTextBookSeoSubSubject)
    .delete('/delete/:id', SubSubject.deleteSubSubject)
    .get('/view/:id', SubSubject.viewSubSubject)
    .patch('/save-content/:id',checkAuth,SubSubject.SaveContent)
    .get('/content/:id',checkAuth,SubSubject.getContent)
    .patch('/save-reviews/:id',upload.single('img_path'),checkAuth,SubSubject.SaveReviews)
    .get('/review/:id/:reviewId',checkAuth,SubSubject.getReview)    
    .patch('/update-review/:id/:reviewId',upload.single('img_path'),checkAuth,SubSubject.updateReview)
    .patch('/delete-review/:id/:reviewId',checkAuth,SubSubject.deleteReview);

module.exports = router;