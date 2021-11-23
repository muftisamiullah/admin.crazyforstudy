const express = require("express");
const Subject = require('../controllers/web/SubjectController.js');
const router = express.Router();

router
    .get('/all', Subject.AllSubjects)
    .get('/:subject_name', Subject.SubSubjects)
    .get('/childsubjects/:sub_subject_name', Subject.GetChildSubjects)
    // .post('/questions/:child_subject', Subject.GetQuestionAndAnswers)
    .post('/questions/:subject/:sub_subject', Subject.GetQuestionAndAnswers2)
    .post('/get-answer/:_id', Subject.GetAnswer)
    .post('/get-answer-sub/:_id', Subject.GetAnswerSub)
    .post('/get-random-questions/:subject_name/:sub_subject_name/:limit', Subject.GetRandomThreeQuestions)
;
    
module.exports = router;