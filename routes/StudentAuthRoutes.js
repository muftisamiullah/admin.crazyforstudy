const express = require("express");
var multerS3 = require('multer-s3'); //s3
var aws = require('aws-sdk') //s3

var multer = require('multer')

const Auth = require('../controllers/student/StudentAuthController.js');
const studentAuth = require("../middleware/student-auth.js");

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
    .post('/register', Auth.Register)
    .post('/login', Auth.Login)
    .post('/forgot-password', Auth.ForgotPassword)
    .post('/refresh-token', Auth.RefreshToken)
    .post('/logout', Auth.Logout)
    .get('/verify/:email/:token', Auth.Verify)
    .post('/sendreset', Auth.sendResetEmail)
    .post('/savegoogle', Auth.saveUser)
    .post('/changepassword', Auth.changePassword)
    .post('/verifyotp', Auth.verifyOtp)
    .post('/get-user',studentAuth, Auth.getUser)
    .post('/edit-user-profile',upload.single('file'), studentAuth, Auth.editUser)
    .get('/getcountries', Auth.getCountryList)  
    .post('/update-pass', Auth.updatePass)
    .post('/update-image-name', Auth.updateImageName);
    
module.exports = router;