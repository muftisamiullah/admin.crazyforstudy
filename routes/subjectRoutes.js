const express =  require("express");
const Subject = require('../controllers/admin/SubjectController.js');
const checkAuth =  require("../middleware/check-auth.js");

const router = express.Router();

router
    .get('/all',checkAuth, Subject.getAllSubject)
    .post('/create',checkAuth, Subject.createSubject)
    .patch('/update/:id',checkAuth,Subject.updateSubject)
    .patch('/update-QA/:id',checkAuth,Subject.updateQASeoSubject)
    .patch('/update-textbook/:id',checkAuth,Subject.updateTextBookSeoSubject)
    .patch('/save-content/:id',checkAuth,Subject.SaveContent)
    .patch('/save-reviews/:id',checkAuth,Subject.SaveReviews)
    .delete('/delete/:id',checkAuth,Subject.deleteSubject)
    .get('/view/:id',Subject.viewSubject)
    // .get('/review/:id/:reviewId',Subject.getReview)
    .get('/review/:id',Subject.getReview)
    .get('/content/:id',Subject.getContent)
    .patch('/update-review/:id/:reviewId',Subject.updateReview);

module.exports = router;