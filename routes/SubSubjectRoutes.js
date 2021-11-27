const express = require("express");
const SubSubject = require('../controllers/admin/SubSubjectController.js');
const checkAuth = require("../middleware/check-auth.js");

var multer = require('multer')
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    fileFilter: function(req, file, cb) {
        console.log(file.mimetype, "dadasd")
    },
    filename: function(req, file, cb) {
        console.log(file)
        cb(null, file.fieldname + '-' + Date.now() + '.csv')
    },
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
    .get('/content/:id',checkAuth,SubSubject.getContent);

module.exports = router;