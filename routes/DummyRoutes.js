const express = require("express");
const Dummy = require('../controllers/admin/DummyController.js');
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
    // .post('/update-dummy', upload.single('file'), checkAuth, Dummy.UpdateDummyCollection)
    .post('/insert-updated-data',checkAuth, Dummy.InsertUpdatedDummyCollection)
    
    .post('/update-dummy1', upload.single('file'), checkAuth, Dummy.UpdateDummy1Collection)
    .post('/update-answers',checkAuth, Dummy.updateAnswersInAlreadyPresentData)

    .get('/get-count/:isbn', Dummy.getCountOfQuestionsAndSolutions)
    // .post('/post-all-books', Dummy.postAllBooks)
    .delete('/delete', upload.single('file'),Dummy.deleteSomeBooks)
;

module.exports = router;