const express =  require("express");
const Subject = require('../controllers/admin/SubjectController.js');
const checkAuth =  require("../middleware/check-auth.js");

const router = express.Router();

router
    .get('/all',checkAuth, Subject.getAllSubject)
    .post('/create',checkAuth, Subject.createSubject)
    .patch('/update/:id',Subject.updateSubject)
    .patch('/update-QA/:id',Subject.updateQASeoSubject)
    .patch('/update-textbook/:id',Subject.updateTextBookSeoSubject)
    .patch('/save-content/:id',Subject.SaveContent)
    .patch('/save-reviews/:id',Subject.SaveReviews)
    .delete('/delete/:id',Subject.deleteSubject)
    .get('/view/:id',Subject.viewSubject)
    .get('/review/:id/:reviewId',Subject.getReview)
    .get('/content/:id',Subject.getContent);

module.exports = router;