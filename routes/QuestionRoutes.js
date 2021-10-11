const express = require("express");
const Question = require('../controllers/admin/QuestionController.js');
const checkAuth = require("../middleware/check-auth.js");
const adminAuth = require("../middleware/admin-auth.js");

const router = express.Router();

router
    .post('/import-data',  checkAuth, Question.importData)
    .get('/chield-question/:chield_subject_id',  checkAuth, Question.chieldQuestion)
    .get('/delete/:chield_subject_id',  checkAuth, Question.deleteChieldQuestion)

    .get('/get-all-quesions-50/:subject_id?/:sub_subject_id?/:filter?/:pageno/:limit', adminAuth, Question.getAllQuestions)
    .get('/get-all-quesions-50/:subject_id/:sub_subject_id/:pageno/:limit/:flag', adminAuth, Question.getQuestionsFlagBased)

    .get('/single-question/:q_id',  checkAuth, Question.GetSingleQuestion)
    .patch('/update-answer/:q_id',  checkAuth, Question.UpdateAnswer)
    .patch('/reject-question/:q_id',  checkAuth, Question.RejectQuestion)

;

module.exports = router;