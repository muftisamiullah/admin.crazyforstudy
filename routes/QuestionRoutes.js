const express = require("express");
const Question = require('../controllers/admin/QuestionController.js');
const checkAuth = require("../middleware/check-auth.js");
const adminAuth = require("../middleware/admin-auth.js");

const router = express.Router();

router
    .post('/import-data',  checkAuth, Question.importData)
    .get('/chield-question/:chield_subject_id',  checkAuth, Question.chieldQuestion)
    .get('/delete/:chield_subject_id',  checkAuth, Question.deleteChieldQuestion)

    .get('/get-all-quesions-qa/:subject_id?/:sub_subject_id?/:filter?/:pageno/:limit', checkAuth, Question.getAllQuestions)
    .get('/single-question-qa/:q_id',  checkAuth, Question.GetSingleQuestion)
    .patch('/update-answer-qa/:q_id',  checkAuth, Question.UpdateAnswer)
    // .patch('/reject-question-qa/:q_id',  checkAuth, Question.RejectQuestion)

    .get('/get-all-quesions-50/:subject_id?/:sub_subject_id?/:filter?/:pageno/:limit', checkAuth, Question.getAllQuestions50)
    .get('/single-question-50/:q_id',  checkAuth, Question.GetSingleQuestion)
    .patch('/update-answer-50/:q_id',  checkAuth, Question.UpdateAnswer50)
    .patch('/reject-question-50/:q_id',  checkAuth, Question.RejectQuestion50)

    .get('/solution-report/:q_type/:flag/:date',  checkAuth, Question.getAllData)
;

module.exports = router;