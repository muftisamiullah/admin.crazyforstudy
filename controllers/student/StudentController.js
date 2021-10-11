const Question = require('../../models/admin/Question.js');
const Book = require('../../models/admin/Book.js');
const TextBook = require('../../models/admin/TextBook.js');
const Notify = require('../../models/admin/Notification.js');
const Student = require('../../models/student/Student.js');
const Admin = require('../../models/admin/Admin');
const emails = require('../../emails/emailTemplates');
var nodemailer = require('nodemailer');

Date.prototype.addMinutes = function(minutes) {
    this.setMinutes(this.getMinutes() + minutes);
    return this;
};

const askQuestion = async (req, res) => {
    try {
        console.log(req.files);
        const data = req.body;
        data.image0 = req.files?.image0 ? req?.files?.image0[0].filename : '';
        data.image1 = req.files?.image1 ? req?.files?.image1[0].filename : '';
        data['last_submition'] = "04:00";
        const question = new Question(data);
        await question.save();
        const notifyData = {
            // {_id:ObjectId('615c053b853c3902f351f007')}
            info: `<p>You will get the answer for <strong>${req.body.question}</strong> within next 2-4 hours, Please be patient.</p>`,
            title: req.body.question,
            type: req.body.type,
            user_Id: req.body.user_Id,
        }
        const noti = new Notify(notifyData);
        const dt = await noti.save();
        const admins = await Admin.find({ role:1 }, {email:1});
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.email,
                pass: process.env.password
            }
        });
        const output = emails.newQuestionRecieved(req.body.question)
        var mailOptionsAdmin = {
            from: process.env.email,
            to: admins,
            subject: 'New Question Recieved',
            html: output
    };

        transporter.sendMail(mailOptionsAdmin, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.status(201).json({error: false, message: "Your question is submitted. you will get answer withing 2-4 Hrs."})
    } catch (error) {
        res.status(501).json({error: true, message: error})
    } 
}

const userQuestion = async (req, res) => {
    try {
        let flag = req.params.flag;
        let cond = '';
        if(req.params.flag){
            cond = {user_Id: req.body.user_Id, type: 'QA', flag: flag}    
        }else{
            cond = {user_Id: req.body.user_Id, type: 'QA'}    
        }
        console.log(cond)
        const questions = await Question.find(cond).sort({created_at: -1});
        res.status(201).json({
            error: false,
            data: questions
        })
    } catch (error) {
        res.status(501).json({
            error: true,
            message: error
        })
    }
}

const userNotifications = async (req, res) => {
    try {
        let cond = '';
        cond = {user_Id: req.body.user_Id, isRead: false}
        if(req.params.isRead === 'all'){
            cond = {user_Id: req.body.user_Id,}
        }
        if(req.params.isRead !== 'all'){
            cond = {user_Id: req.body.user_Id, isRead: req.params.isRead}
        }
        if(req.params.isRead === undefined){
            cond = {user_Id: req.body.user_Id, isRead:false}
        }
        
        const questions = await Notify.find(cond).sort({created_at:-1});
        res.status(201).json({
            error: false,
            data: questions
        })
    } catch (error) {
        res.status(501).json({
            error: true,
            message: error
        })
    }
}

const modifyNotification = async (req, res) => {
    try {
        await Notify.updateMany({},{isRead: 0, status: 0});
        res.status(201).json({
            error: false,
            message: "Updated successfully"
        })
    } catch (error) {
        res.status(501).json({
            error: true,
            message: error
        })
    }
}

const readNotifications = async (req, res) => {
    try {
        await Notify.findByIdAndUpdate({_id: req.params.id},{isRead: 1, status: 1});
        res.status(201).json({
            error: false,
            message: "Update Notification successfully"
        })
    } catch (error) {
        res.status(501).json({
            error: true,
            message: error
        })
    }
}

const checkBookIsbn = async (req, res) => {
    try {    
        const book_isbn = req.params.isbn;
        const books = await Book.findOne({ISBN13: book_isbn});
        const filter = {user_Id: req.body.user_Id, isbn: book_isbn}
        var options = { upsert: true, new: true, setDefaultsOnInsert: true };  
        let updateData = '';
        if(books){
            updateData = {inStock: 1,book_name: books.BookName, edition: books.Edition}
            var message = "View More";
        }else{
            updateData = {inStock: 0}
            var message = "Will be available in 3-4 working Days.";
        }

        await TextBook.findOneAndUpdate(filter, updateData, options);
        res.status(201).json({
            error: false,
            message: message
        })

    } catch (error) {
        res.status(501).json({
            error: true,
            message: error.message
        })
    }

}

const myTextBook = async (req, res) => {
    try {    
        const filter = {user_Id: req.body.user_Id}
        const TextBooks = await TextBook.find(filter,{_id: 1, isbn: 1, book_name: 1, edition: 1, user_Id: 1});
        res.status(200).json({
            error: false,
            data: TextBooks
        })

    } catch (error) {
        res.status(501).json({
            error: true,
            message: error.message
        })
    }
}

const mySubscription = async (req, res) => {
    try {    
        const filter = {_id: req.body.user_Id}
        const Subscription = await Student.findOne(filter, { "transactions" : 1, "_id" : false, });
        res.status(200).json({
            error: false,
            data: Subscription
        })

    } catch (error) {
        res.status(501).json({
            error: true,
            message: error.message
        })
    }
}

const deleteTextBook = async (req, res) => {
    try {    
        const filter = {user_Id: req.body.user_Id, _id: req.body.id}
        const textbook = await TextBook.deleteOne(filter);
        if(textbook){
            res.status(200).json({
                error: false,
                message: "textbook deleted successfully"
            })
        }
    } catch (error) {
        res.status(501).json({
            error: true,
            message: error.message
        })
    }
}

module.exports = {
    askQuestion,
    userQuestion,
    userNotifications,
    modifyNotification,
    readNotifications,
    checkBookIsbn,
    myTextBook,
    mySubscription,
    deleteTextBook,
}