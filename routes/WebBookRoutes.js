const express = require("express");
const Book = require('../controllers/web/BookController.js');
const checkAuth = require("../middleware/check-auth.js");
const router = express.Router();

router
    .get('/view-all', Book.getAllBook)
    .post('/subject/:subject_name/:sub_subject_name', Book.BooksBySubSubjectName)
    .get('/subsubject/search/:subsubject/:isbn', Book.searchSubSubject)
    .get('/popular-books', Book.popularBooks)
    .post('/search-chapter-question', Book.searchChapterQuestion)
    .get('/search-book-name-isbn/:search/:limit', Book.searchBookNameIsbn)
    .get('/book/search-question/:isbn/:search', Book.searchQuestion)
    // .get('/search-chapter-question/:search/:limit', Book.searchChapterQuestion)
    .get('/search-book-name-isbn-individual/:search/:limit/:pageno', Book.searchBookNameIsbnIndividual)
    .get('/search-chapter-question/:search/:limit/:pageno', Book.searchChapterQuestionIndividual)
    .get('/search-question-qanda/:search/:limit/:pageno', Book.searchQuestionAndAnswerIndividual)

    //used on book detail page
    .get('/related-books/:sub_subject', Book.relatedBooks)
    .get('/book/:isbn', Book.getBook)
    .get('/book/chapter/:isbn', Book.getBookChapters)
    .get('/book/chapter/section/:isbn/:chapter_no', Book.getBookSections)
    .get('/book/chapter/section/exercise/:isbn/:chapter_no/:section_no', Book.getBookExercises)
    .get('/book/chapter/section/exercise/problem/:isbn/:chapter_no/:section_no/:excerise_no', Book.getBookProblems)
    .get('/book/chapter/section/exercise/problem/answer/:isbn/:chapter_no/:section_no/:excerise_no', Book.getBookProblemsWithAnswer)
    .get('/book/only-problem/:isbn/:chapter_no', Book.getBookOnlyProblems)
    .get('/book/only-problem/answer/:isbn/:chapter_no', Book.getBookOnlyProblemsWithAnswers)
    .post('/book/ask-for-solution', checkAuth, Book.askForSolution)


module.exports = router;