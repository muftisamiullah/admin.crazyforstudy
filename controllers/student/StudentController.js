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
        const data = req.body;
        const cond = {user_Id: req.body.user_Id, type: 'QA'}    
        const count =  await Question.find(cond).count();
        if(count > 50){
            // const error = new Error("message")
            // error.code = "501"
            // throw error;
            return res.status(501).json({error: true, message: "User can ask only 5o questions"}) 
        }
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
        const output = emails.newQuestionRecieved(question.question, req.body.subject, req.body.sub_subject, req.body.subject_id, req.body.sub_subject_id, question._id)
        const outputAdmin = emails.newQuestionRecievedAdmin(req.body.email,question.question, req.body.subject, req.body.sub_subject, req.body.subject_id, req.body.sub_subject_id, question._id)
        var mailOptionsAdmin = {
            from: process.env.email,
            to: admins,
            subject: 'A Student just placed a New Question! Check now.',
            html: outputAdmin
        };

        var mailOptionsStudent = {
            from: process.env.email,
            to: req.body.email,
            subject: 'New Question Recieved!',
            html: output
        };
        
        Promise.all([
            transporter.sendMail(mailOptionsStudent),
            transporter.sendMail(mailOptionsAdmin),
        ])
            .then((res) => console.log('Email sent: ' + res))
            .catch((err) => console.log(err));

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
        const student = await Student.findOne({_id:req.body.user_Id});

        const filter = {user_Id: req.body.user_Id, isbn: book_isbn}
        var options = { upsert: true, new: true, setDefaultsOnInsert: true };  
        let updateData = '';
        if(books){
            updateData = { inStock: 1,book_name: books.BookName, edition: books.Edition, user_name: student.Name }
            var message = "View More";
        }else{
            updateData = {inStock: 0, user_name: student.Name}
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

const askAlreadyPQuestion = async (req, res) => {
    try {
        let update = req.body
        update.flag = "pending"
        update.created_at = new Date();
        const question = await Question.findOne({_id:req.body.q_id})
        const resolved = await Question.findByIdAndUpdate({_id:req.body.q_id}, update)
        if(resolved){
            const notifyData = {
                info: `<p>You will get the answer for the question:</p> <p><strong>${question.question}</strong></p> <p>within next 2-4 hours, Please be patient.</p>`,
                title: question.question,
                type: question.type,
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
            const output = emails.newQuestionRecieved(question.question, question.subject, question.sub_subject, question.subject_id, question.sub_subject_id, question._id)
            const outputAdmin = emails.newQuestionAskedAdmin(req.body.email, question.question, question.subject, question.sub_subject, question.subject_id, question.sub_subject_id, question._id)
            var mailOptionsAdmin = {
                from: process.env.email,
                to: admins,
                subject: 'A Student just placed a New Q&A Question Request! Check it now.',
                html: outputAdmin
            };
            var mailOptionsStudent = {
                from: process.env.email,
                to: req.body.email,
                subject: 'Crazy For Study is working on your homework question!',
                html: output
            };
            
            Promise.all([
                transporter.sendMail(mailOptionsStudent),
                transporter.sendMail(mailOptionsAdmin),
            ])
                .then((res) => console.log('Email sent: ' + res))
                .catch((err) => console.log(err));
        }
        return res.status(201).json({
            message: "Question, Updated"
        })
    } catch (error) {
        res.send({
            error: true,
            code: 501,
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
    askAlreadyPQuestion
}