const Book = require('../../models/admin/Book.js');
const Chapter = require('../../models/admin/Chapter');
const Question = require('../../models/admin/Question');
const emails = require('../../emails/emailTemplates');
const Notify = require('../../models/admin/Notification.js');
const Student = require('../../models/student/Student');
const Admin = require('../../models/admin/Admin.js');

var nodemailer = require('nodemailer');

const getAllBook = async(req, res) => {
    try {
        const Books = await Book.find({ status: true }, { __v: 0 }).limit(10);
        return res.status(200).json({
            data: Books
        });
    } catch (error) {
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}

const getBook = async(req, res) => {
    // return res.send(req.params.isbn)
    try {
        const Books = await Book.find({ ISBN13: req.params.isbn, status: true }, { __v: 0 }).lean();
        let total = 0;
        let rating_1 = 0;
        let rating_2 = 0;
        let rating_3 = 0;
        let rating_4 = 0;
        let rating_5 = 0;
        let bestRating = null;
        Books[0]?.reviews?.map((item, key)=>{
            total = total + 1;
            if(item.rating == 1){
                rating_1 = rating_1 + 1;
            }
            if(item.rating == 2){
                rating_2 = rating_2 + 1;
            }
            if(item.rating == 3){
                rating_3 = rating_3 + 1;
            }
            if(item.rating == 4){
                rating_4 = rating_4 + 1;
            }
            if(item.rating == 5){
                rating_5 = rating_5 + 1;
            }
        })
        if(rating_1 > 0){ bestRating = 1 }
        if(rating_2 > 0){ bestRating = 2 }
        if(rating_3 > 0){ bestRating = 3 }
        if(rating_4 > 0){ bestRating = 4 }
        if(rating_5 > 0){ bestRating = 5 }
        let ratingAv = ((5 * rating_5) + (4 * rating_4) + (3 * rating_3) + (2 * rating_2) + (1 * rating_1)) / total;
        Books[0].ratingAv = ratingAv;
        Books[0].rating_1 = rating_1;
        Books[0].rating_2 = rating_2;
        Books[0].rating_3 = rating_3;
        Books[0].rating_4 = rating_4;
        Books[0].rating_5 = rating_5;
        Books[0].total = total;
        Books[0].bestRating = bestRating;
        // Books[0].ratingAv = Books[0].reviews.length;
        // return res.send(Books[0].reviews.length)
        return res.status(200).json({
            data: Books
        });
    } catch (error) {
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}

const BooksBySubSubjectName = async(req, res) => {
    try {
        let filter = {}
        if(req.params.sub_subject_name == "other"){
            filter ={
                 sub_subject_name: req.params.sub_subject_name, 
                 subject_name: req.params.subject_name 
            }
        }else{
            filter ={
                sub_subject_name: req.params.sub_subject_name, 
            }
        }
        const total = await Book.countDocuments(Book.find(filter, { __v: 0 })).collation( { locale: 'en', strength: 2 } );
        const Books = await Book.find(filter, { __v: 0 }).skip(req.body.pageno * req.body.limit).limit(parseInt(req.body.limit)).collation( { locale: 'en', strength: 2 } );
        return res.status(200).json({
            total: total,
            data: Books
        });
    } catch (error) {
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}

const searchSubSubject = async(req, res) => {
    // return res.send(req.params);
    try {
        const isbn = req.params.isbn;
        const books = await Book.aggregate([
            {
                "$search":{
                    "autocomplete": {
                        "path": "ISBN13",
                        "query": `${isbn}`,
                    }
                }
            }
            ,{
                $limit: 10
            },{
                $project: {
                    sub_subject_name: 1,
                    BookName: 1,
                    ISBN13: 1,
                    Edition: 1,
                    Author1: 1,
                    score: { $meta: "searchScore" }
                }
            }
        ]);
        return res.status(200).json({
            data: books
        });
    } catch (error) {
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}

const popularBooks = async(req, res) => {
    // return res.send("hasd");
    try {
        const Books = await Book.aggregate([
            { $sample: { size: 4 } }
        ]);
        return res.status(200).json({
            data: Books
        });
    } catch (error) {
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}

// function regexEscape(string){
//     return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// }

const searchChapterQuestion = async (req, res) => {
    // const search = req.params.search;
    // const limit = parseInt(req.params.limit);
    const search = req.body.search; // only recieve 100 chars in search
    const limit = parseInt(req.body.limit);
    // working with special charcters
    // let searchString = regexEscape(search)

    const questions = await Chapter.find({ 
        $or:
        // [{book_isbn: { $regex: search}},{book_name:{ $regex:search }},{question:{$regex:search}}]
        [{question:{$regex:search}}]
    },{
        _id:0,
        book_id :1,
        book_name:1,
        chapter_no:1,
        chapter_name:1,
        section_no:1,
        section_name:1,
        excerise:1,
        problem_no:1,
        question:1,
        book_isbn:1,
    }).limit(limit);

    res.status(200).json({
        questions
    });
}

const searchChapterQuestionIndividual = async (req, res) => {
    const search = req.params.search;
    const limit = parseInt(req.params.limit);
    // return res.send(req.params)

    const total = await Chapter.countDocuments(Chapter.find({ 
        $or:
        // [{book_isbn: { $regex: search}},{book_name:{ $regex:search }},{question:{$regex:search}}]
        [{question:{$regex:search}}]}));
    const questions = await Chapter.find({ 
        $or:
        // [{book_isbn: { $regex: search}},{book_name:{ $regex:search }},{question:{$regex:search}}]
        [{question:{$regex:search}}]
    },{
        _id:0,
        book_id :1,
        book_name:1,
        chapter_no:1,
        chapter_name:1,
        section_no:1,
        section_name:1,
        excerise:1,
        problem_no:1,
        question:1,
        book_isbn:1,
    }).skip(req.params.pageno * req.params.limit).limit(parseInt(req.params.limit));

    res.status(200).json({
        questions:questions,
        total:total
    });
}

const searchQuestionAndAnswerIndividual = async (req, res) => {
    const search = req.params.search;
    const limit = parseInt(req.params.limit);
    // return res.send(req.params)

    const total = await Question.countDocuments(Question.find({ 
        $or:
        // [{book_isbn: { $regex: search}},{book_name:{ $regex:search }},{question:{$regex:search}}]
        [{question:{$regex:search}}]}));
    const questions = await Question.find({ 
        $or:
        // [{book_isbn: { $regex: search}},{book_name:{ $regex:search }},{question:{$regex:search}}]
        [{question:{$regex:search}}]
    },{
        _id:0,
        question :1,
        old_qid:1,
        type:1,
        shortanswer:1,
        completeanswer:1,
        subject:1,
        subject_id:1,
        sub_subject_id:1,
        chield_subject_id:1,
    }).skip(req.params.pageno * req.params.limit).limit(parseInt(req.params.limit));

    res.status(200).json({
        questions:questions,
        total:total
    });
}

const searchBookNameIsbn = async (req, res) => {
    const search = req.params.search;
    const limit = parseInt(req.params.limit);

    const books = await Book.find({ 
        $or:
        [{ISBN13: { $regex: search }},{ BookName:{ $regex:search }}]
    },{
        _id:0,
        BookName:1,
        ISBN13:1,
        Edition:1,
        Author1:1,
        ISBN10:1,
    }).limit(parseInt(limit));

    res.status(200).json({
        books
    });
}

const searchBookNameIsbnIndividual = async (req, res) => {
    const search = req.params.search;
    const limit = parseInt(req.params.limit);
    // return res.send(req.params)
    const total =  await Book.countDocuments(Book.find({ 
            $or:
            [{ISBN13: { $regex: search }},{ BookName:{ $regex:search }}]
        }))

    const books = await Book.find({ 
        $or:
        [{ISBN13: { $regex: search }},{ BookName:{ $regex:search }}]
    },{
        _id:0,
        BookName:1,
        ISBN13:1,
        Edition:1,
        Author1:1,
        ISBN10:1,
    }).skip(req.params.pageno * req.params.limit).limit(parseInt(req.params.limit));

    res.status(200).json({
        books: books,
        total: total,
    });
}

const getBookChapters = async (req, res) => {

    const chapters = [];
    const map = new Map();
    const results = await Chapter.find({
        "book_isbn": `${req.params.isbn}`,
    },{
        _id: 0,
        chapter_no: 1,
        chapter_name: 1
    });
    results.forEach( item => {
        if(!map.has(item.chapter_no)){
            map.set(item.chapter_no, true);
            chapters.push({
                chapter_no: item.chapter_no, 
                chapter_name: item.chapter_name, 
            })
        }
    });
    res.status(200).json({
        isbn: req.params.isbn,
        chapters
    });
}

const getBookSections = async (req, res) => {
    
    const results = await Chapter.find({
        "book_isbn": `${req.params.isbn}`,
        "chapter_no": `${req.params.chapter_no}`,
    },{
        _id: 0,
        section_no: 1,
        section_name: 1
    });

    const sections = [];
    
    const map = new Map();
    results.forEach( item => {
        if(!map.has(item.section_no)){
            map.set(item.section_no, true);
            sections.push({
                section_no: item.section_no, 
                section_name: item.section_name, 
            })
        }
    });
    res.status(200).json({
        isbn: req.params.isbn, 
        chapter_no: req.body.chapter_no, 
        sections});
}

const getBookExercises = async (req, res) => {
    const results = await Chapter.find({
        "book_isbn": `${req.params.isbn}`,
        "chapter_no": `${req.params.chapter_no}`,
        "section_no": `${req.params.section_no}`,
    },{
        _id: 0,
        excerise: 1
    });

    let excerises = [];
    
    const map = new Map();
    results.forEach( item => {
        if(!map.has(item.excerise)){
            map.set(item.excerise, true);
            excerises.push({
                excerise: item.excerise 
            })
        }
    });
    res.status(200).json({
        isbn: req.params.isbn,
        chapter_no: req.body.chapter_no,
        section_no: req.body.section_no, 
        excerises
    });
    
}

const getBookProblems = async (req, res) => {
    const results = await Chapter.find({
        "book_isbn": `${req.params.isbn}`,
        "chapter_no": `${req.params.chapter_no}`,
        "section_no": `${req.params.section_no}`,
        "excerise": `${req.params.excerise_no}`,
    },{
        _id: 1,
        problem_no: 1,
        question: 1,
    });

    const problems = [];
    
    const map = new Map();
    results.forEach( item => {
        if(!map.has(item.problem_no)){
            map.set(item.problem_no, true);
            problems.push({
                q_id: item._id, 
                problem_no: item.problem_no, 
                question: item.question, 
            })
        }
    });
    res.status(200).json({
        isbn: req.params.isbn,
        chapter_no: req.body.chapter_no,
        section_no: req.body.section_no, 
        excerise: req.body.excerise,
        problems
    });
}

const getBookProblemsWithAnswer = async (req, res) => {
    const results = await Chapter.find({
        "book_isbn": `${req.params.isbn}`,
        "chapter_no": `${req.params.chapter_no}`,
        "section_no": `${req.params.section_no}`,
        "excerise": `${req.params.excerise_no}`,
    },{
        _id: 1,
        problem_no: 1,
        question: 1,
        answer: 1,
        expert_answer:1,
        another_answer:1,
    });

    const problems = [];
    
    const map = new Map();
    results.forEach( item => {
        if(!map.has(item.problem_no)){
            map.set(item.problem_no, true);
            if(item.answer!="" && item.answer != undefined){
                problems.push({
                    q_id: item._id, 
                    problem_no: item.problem_no, 
                    question: item.question, 
                    answer: item.answer
                })
            }else if(item.expert_answer!="" && item.expert_answer != undefined){
                problems.push({
                    q_id: item._id, 
                    problem_no: item.problem_no, 
                    question: item.question, 
                    answer: item.expert_answer
                })
            }else{
                problems.push({
                    q_id: item._id, 
                    problem_no: item.problem_no, 
                    question: item.question, 
                    answer: item.another_answer
                })
            } 
        }
    });
    res.status(200).json({
        isbn: req.params.isbn,
        chapter_no: req.body.chapter_no,
        section_no: req.body.section_no, 
        excerise: req.body.excerise,
        problems
    });
}

const getBookOnlyProblems = async (req, res) => {
    const results = await Chapter.find({
        "book_isbn": `${req.params.isbn}`,
        "chapter_no": `${req.params.chapter_no}`
    },{
        _id: 1,
        problem_no: 1,
        question: 1,
    });

    const problems = [];
    
    const map = new Map();
    results.forEach( item => {
        if(!map.has(item.problem_no)){
            map.set(item.problem_no, true);
            problems.push({
                q_id: item._id, 
                problem_no: item.problem_no, 
                question: item.question, 
            })
        }
    });
    res.status(200).json({
        isbn: req.params.isbn,
        chapter_no: req.body.chapter_no,
        problems
    });
}

const getBookOnlyProblemsWithAnswers = async (req, res) => {
    const results = await Chapter.find({
        "book_isbn": `${req.params.isbn}`,
        "chapter_no": `${req.params.chapter_no}`
    },{
        _id: 1,
        problem_no: 1,
        question: 1,
        answer: 1,
        expert_answer: 1,
        another_answer: 1,
    });

    const problems = [];
    
    const map = new Map();
    results.forEach( item => {
        if(!map.has(item.problem_no)){
            map.set(item.problem_no, true);
            if(item.answer != "" && item.answer != undefined){
                problems.push({
                    q_id: item._id, 
                    problem_no: item.problem_no, 
                    question: item.question, 
                    answer: item.answer,
                })
            }else if(item.expert_answer!="" && item.expert_answer != undefined){
                problems.push({
                    q_id: item._id, 
                    problem_no: item.problem_no, 
                    question: item.question, 
                    answer: item.expert_answer,
                })
            }else{
                problems.push({
                    q_id: item._id, 
                    problem_no: item.problem_no, 
                    question: item.question, 
                    answer: item.another_answer,
                })
            }
        }
    });
    res.status(200).json({
        isbn: req.params.isbn,
        chapter_no: req.body.chapter_no,
        problems
    });
}

const relatedBooks = async(req, res) => {
    try {
        const Books = await Book.aggregate([
            {$match: {sub_subject_name: `${req.params.sub_subject}`}},
            { $sample: { size: 4 } }
        ])
        return res.status(200).json({
            data: Books
        });
    } catch (error) {
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}

const searchQuestion = async (req, res) => {
    const s = req.params.search;
    const isbn = req.params.isbn;
    const results = await Chapter.find({
        book_isbn: isbn, 
        question: { $regex: s }
    },{
        _id: 0,
        problem_no: 1,
        question: 1,
        chapter_no: 1,
        chapter_name: 1,
    }).limit( 10 );
    const problems = [];
    const map = new Map();
    results.forEach( item => {
        if(!map.has(item.problem_no)){
            map.set(item.problem_no, true);
            problems.push({
                problem_no: item.problem_no, 
                question: item.question, 
                chapter_no: item.chapter_no, 
                chapter_name: item.chapter_name, 
                
            })
        }
    });
    res.status(200).json({
        problems
    });
}

const askForSolution = async(req, res) => {
    try {
        // let ids = [] 
        // ids.push({user_id: req.body.user_Id,user_email:req.body.email});
        // const chap = await Chapter.findOneAndUpdate({_id:req.body.q_id},{$addToSet: {answerRequestedIds : ids},$set:{answerFlag:"pending"}});
        const chap = await Chapter.findOneAndUpdate(
            {_id:req.body.q_id, 'answerRequestedIds.user_id': {$ne: req.body.user_Id}}, 
            {$push: {answerRequestedIds: {user_id: req.body.user_Id,user_email:req.body.email,answerRequestDate: new Date()}}})
        if(!chap){
            return res.status(200).json({
                msg: "Already asked",
            });
        }
        const notifyData = {
            title: req.body.question,
            info: `<p>You will get solution for <strong>${(req.body.question).substr(0,30)}</strong></p>`,
            type: 'TBS',
            user_Id: req.body.user_Id,
        }
        const noti = new Notify(notifyData);
        const dt = await noti.save();
        const student = await Student.findOne({_id:req.body.user_Id});
        const admins = await Admin.find({ role:1 }, {email:1});
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.email,
                pass: process.env.password
            }
        });
        const output = emails.askTbsSolution(student.Name, req.body.book_name, req.body.chapter_name, req.body.section_name, req.body.question)
        const adminMail = emails.askTbsSolutionAdmin(student.Name, req.body.book_name, req.body.chapter_name, req.body.section_name, req.body.question, req.body.q_id)

        var mailOptionsStudent = {
            from: process.env.email,
            to: student.Email,
            subject: 'Crazy For Study is working on your question!',
            text: output
        };

        var mailOptionsAdmin = {
            from: process.env.email,
            to: admins,
            subject: 'Recieved new question in TBS!',
            // html: `<h1>Welcome</h1><p><a href=${link}>Click here to verify</a></p>`
            html: adminMail
        };

        Promise.all([
            transporter.sendMail(mailOptionsStudent),
            transporter.sendMail(mailOptionsAdmin),
          ])
            .then((res) => console.log('Email sent: ' + res))
            .catch((err) => console.log(err));
    
        return res.status(200).json({
            msg: "Success",
        });
    } catch (error) {
        console.log(error)
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}

module.exports = {
    getAllBook,
    getBook,
    BooksBySubSubjectName,
    searchSubSubject,
    popularBooks,
    searchChapterQuestion,
    searchBookNameIsbn,
    getBookChapters,
    getBookSections,
    getBookExercises,
    relatedBooks,
    getBookProblems,
    getBookProblemsWithAnswer,
    getBookOnlyProblems,
    getBookOnlyProblemsWithAnswers,
    searchQuestion,
    searchBookNameIsbnIndividual,
    searchChapterQuestionIndividual,
    searchQuestionAndAnswerIndividual,
    askForSolution,
}