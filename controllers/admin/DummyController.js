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
        dummies.map( async (it , key) => {
            const response = await axios.get(`https://backup.crazyforstudy.com/api/get-book-question-new.php?accessKey=crazyforstudy&isbn=${it.ISBN}`)
            const d = response.data
            d.map(async (item, key) => {
                if(item.answer != ''){
                    await Chapter.findOneAndUpdate({book_isbn:it.ISBN,old_qid:item.old_qid, answer_uploaded:false},{$set: { 
                        answer: item.answer,
                        answer_uploaded: true,
                    }});
                }
                // await Chapter.findOneAndUpdate({book_isbn:"9780133915389",answer_uploaded:true},{$set: { 
                //     answer_uploaded: false,
                // }});
                console.log(key)
            });
        });
        return res.status(200).send('Done')
    } catch (error) {
        return res.status(409).json({
            message: "External Error occured",
            errors: error.message
        });
    }
}

module.exports = {
    UpdateDummyCollection,
    UpdateDummy1Collection,
    InsertUpdatedDummyCollection,
    updateAnswersInAlreadyPresentData,
}