const Dummy = require('../../models/admin/Dummy.js');
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

const otherFunction = async(res, FinalData, callback) => {
    await Dummy.insertMany(FinalData).then(() => {
        res.status(200).send('Sub subject Inserted')
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
            const book = await Book.findOne({ISBN13:item.ISBN})
            console.log(book)
            if(book){
                item.Available = 'yes';
            }else{
                item.Available = 'no';
            }
            item.save(function(err, res) { 
                console.log(res) 
            })
        });
        // dummies.map( async (item, key)=>{
        //     console.log("*first* ",key)
        //     const chap = await Chapter.find({book_isbn:item.ISBN})
        //     if(chap.length > 0){
        //         chap.map(async(it, i)=>{
        //             console.log("*map* ",i)
        //             if(it.answer != undefined && it.answer != ""){
        //                 console.log(it.answer)
        //                 item.Solutions = 'yes';
        //             }
        //         })
        //     }else{
        //         item.Questions = "no chapter",
        //         item.pq_type = "no chapter",
        //         item.Solutions = "no chapter"
        //     }
        //     item.save(function(err, res) { 
        //         console.log(res) 
        //     })
        // });
    } catch (error) {
        return res.status(409).json({
            message: "External Error occured",
            errors: error.message
        });
    }
}

module.exports = {
    UpdateDummyCollection,
    InsertUpdatedDummyCollection,
}