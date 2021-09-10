const express = require("express");
const Auth = require('../controllers/student/StudentAuthController.js');
const studentAuth = require("../middleware/student-auth.js");

var multer = require('multer')
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    fileFilter: function(req, file, cb) {
        console.log(file.mimetype, "dadasd")
    },
    filename: function(req, file, cb) {
        // console.log(file)
        cb(null, file.originalname)
    },
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
    .get('/getcountries', Auth.getCountryList);
    
module.exports = router;