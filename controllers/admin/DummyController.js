const Dummy = require('../../models/admin/Dummy.js');
const Dummy1 = require('../../models/admin/Dummy1.js');
const Book = require('../../models/admin/Book.js');
const Chapter = require('../../models/admin/Chapter.js');
const csv = require('csv-parser')
const fs = require('fs');

const UpdateDummyCollection = async(req, res) => {
    const data = req.body;
    let FinalData = [];
    try {
        let results = [];
        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                results.forEach(dummy => {
                    FinalData.push({ 
                        ISBN: dummy.ISBN, 
                        BookName: dummy['Book Name'], 
                        Status: dummy['Status'], 
                        Priority: dummy['Priority'],
                        Available: dummy['Available'],
                        Questions: dummy['Questions'],
                        pq_type: dummy['PQ Type'],
                        Solutions: dummy['Solutions']
                    })
                })
                otherFunction(res, FinalData, function() {
                    fs.unlinkSync(req.file.path)
                })
            });
    } catch (error) {
        return res.status(409).json({
            message: "External Error occured",
            errors: error.message
        });
    }
}

const UpdateDummy1Collection = async(req, res) => {
    const data = req.body;
    let FinalData = [];
    try {
        let results = [];
        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                results.forEach(dummy => {
                    FinalData.push({ 
                        ISBN: dummy.ISBN, 
                        BookName: dummy['Book Name'], 
                    })
                })
                otherFunction1(res, FinalData, function() {
                    fs.unlinkSync(req.file.path)
                })
            });
    } catch (error) {
        return res.status(409).json({
            message: "External Error occured",
            errors: error.message
        });
    }
}

const otherFunction = async(res, FinalData, callback) => {
    await Dummy.insertMany(FinalData).then(() => {
        res.status(200).send('Data Inserted')
        callback()
    }).catch(error => {
        return res.status(409).json({
            message: "Error occured while Inserting Data",
            errors: error.message
        });
    })
}

const otherFunction1 = async(res, FinalData, callback) => {
    await Dummy1.insertMany(FinalData).then(() => {
        res.status(200).send('Data Inserted')
        callback()
    }).catch(error => {
        return res.status(409).json({
            message: "Error occured while Inserting Data",
            errors: error.message
        });
    })
}

const InsertUpdatedDummyCollection = async (req,res) => {
    try{
        console.log("in function")
        const dummies = await Dummy.find();
        dummies.map( async (item , key) => {
            // const book = await Book.findOne({ISBN13:item.ISBN})
            // console.log(book)
            // if(book){
            //     item.pq_type = 'yes';
            // }else{
            //     item.Available = 'no';
            // }
            if(item.pq_type == 'yes'){
                item.pq_type = 'no';
            }
            item.save(function(err, res) { 
                console.log(res) 
            })
        });
        return;
        dummies.map( async (item, key)=>{
            // console.log("*first* ",key)
            const chap = await Chapter.find({book_isbn:item.ISBN})
            if(chap.length > 0){
                chap.map(async(it, i)=>{
                    // console.log("*map* ",i)
                    if(it.problem_no != ""){
                        item.pq_type = 'yes';
                        console.log(it);
                    }
                    // if(it.answer != undefined && it.answer != ""){
                    //     console.log(it.answer)
                    //     item.Solutions = 'yes';
                    // }
                })
            }else{
                item.Questions = "no chapter",
                item.pq_type = "no chapter",
                item.Solutions = "no chapter"
            }
            item.save(function(err, res) { 
                console.log(res) 
            })
        });
    } catch (error) {
        return res.status(409).json({
            message: "External Error occured",
            errors: error.message
        });
    }
}

const updateAnswersInAlreadyPresentData = async (req,res) => {
    try{
        console.log("in present")
        const axios = require('axios');
        const dummies = await Dummy1.find();
        // const ISBN = 9781260696257;
        dummies.map( async (it , i) => {
            const response = await axios.get(`https://backup.crazyforstudy.com/api/get-book-question-new.php?accessKey=crazyforstudy&isbn=${it.ISBN}`)
            const d = response.data
            if(typeof(d)!== "string"){
                // console.log(i, "total books done")
                d.map(async (item, key) => {
                    if(item.answer != ''){
                        await Chapter.findOneAndUpdate({book_isbn:it.ISBN,chapter_no:item.chapter_no, problem_no:item.problem_no,section_no:item.section_no},{$set: { 
                            answer: item.answer,
                            answer_uploaded: true,
                        }});
                    }
                    // await Chapter.findOneAndUpdate({book_isbn:"9780133915389",answer_uploaded:true},{$set: { 
                    //     answer_uploaded: false,
                    // }});
                    console.log(key)
                });
            }
        });
        return res.status(200).send('Done')
    } catch (error) {
        return res.status(409).json({
            message: "External Error occured",
            errors: error.message
        });
    }
}

const getCountOfQuestionsAndSolutions = async(req,res) => {
    const chapter = await Chapter.find({book_isbn:req.params.isbn});
    let Data = [];
    if(chapter.length <= 0){
        Data.push({ ISBN:req.params.isbn, no_of_questions: 0, no_of_solutions:0 })
    }else{
        // console.log(chapter)
        let question_count = 0;
        let answer_count = 0;
        chapter.map(async (it, i) => {
            if(it.problem_no || it.question && it.problem_no != null || it.question != null){
                question_count++;
            }
            if(it.answer){
                answer_count++;
            }
            // console.log(it.problem_no, "problem")
            // console.log(it.question, "question")
        })
        Data.push({ ISBN:req.params.isbn, no_of_questions: question_count, no_of_solutions:answer_count })
    }
    return res.status(201).json({
        data: Data
    })  
    // const books = await Book.find({},{ISBN13:1}).limit(5000);
    // let Data = [];
    // let promises = books.map( async (item , i) => {
    //     const chapter = await Chapter.find({ book_isbn:item.ISBN13 });
    //     if(chapter.length <= 0){
    //         console.log("chapter is empty")
    //         Data.push({ ISBN:item.ISBN13, questions: 0, solutions:0 })
    //     }else{
    //         // console.log(chapter)
    //         let question_count = 0;
    //         let answer_count = 0;
    //         chapter.map(async (it, i) => {
    //             if(it.problem_no || it.question && it.problem_no != null || it.question != null){
    //                 question_count++;
    //             }
    //             if(it.answer){
    //                 answer_count++;
    //             }
    //             // console.log(it.problem_no, "problem")
    //             // console.log(it.question, "question")
    //         })
    //         console.log(question_count, answer_count, "count")
    //         Data.push({ ISBN:item.ISBN13, questions: question_count, solutions:answer_count })
    //     }
    //     console.log(i)
    //     Promise.allSettled(promises)
    //         .then(results => {
    //             console.log(Data.length)
    //             console.log("******************************** book loop ended ********************************")
    //         })
    //     .catch(e => {
    //       console.error(e);
    //     })
    // })
}

module.exports = {
    UpdateDummyCollection,
    UpdateDummy1Collection,
    InsertUpdatedDummyCollection,
    updateAnswersInAlreadyPresentData,
    getCountOfQuestionsAndSolutions,
}