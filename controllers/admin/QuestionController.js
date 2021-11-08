const Question = require('../../models/admin/Question.js');
const Student = require('../../models/student/Student.js');
const ChieldSubject = require('../../models/admin/ChieldSubject.js');
const emails = require('../../emails/emailTemplates');
const Notify = require('../../models/admin/Notification.js');
const Assignment = require('../../models/admin/Assignment');

var nodemailer = require('nodemailer');

const importData = async (req, res) => {
    try {
        const data = req?.body?.questions;
        await Question.insertMany(data);
        
        const pageCount = req?.body?.pageCount;
        const currentPage = req?.body?.currentPage;
        const perPage = req?.body?.perPage;
        const page = req?.body?.page;
        const totalQuestion = req?.body?.totalQuestion;
        const chield_subject_id = req?.body?.chield_subject_id;
        
        let filterData = {chield_subject_id: chield_subject_id};
        let total_uploaded = 0;

        if(pageCount == "1"){
            total_uploaded = data?.length
            await ChieldSubject.findOneAndUpdate(filterData,{
                "status": true,
                "toal_question": totalQuestion,
                "total_page": pageCount,
                "page_uploaded": page,
                "total_uploaded": total_uploaded
            });    
        }else if(pageCount > "1"){
            let chieldData = await ChieldSubject.findOne(filterData,{
                "toal_question": 1,
                "total_page": 1,
                "page_uploaded": 1,
                "total_uploaded": 1
            });

            total_updated = +chieldData?.total_uploaded + +data?.length;
            // return res.send(total_updated);
            let status;
            if(+currentPage === +pageCount){
                status = true
            }else{
                status = false
            }
            await ChieldSubject.findOneAndUpdate(filterData,{
                "toal_question": totalQuestion,
                "status": status,
                "total_page": pageCount,
                "page_uploaded": page,
                "total_uploaded": total_updated
            });
        }

        return res.status(201).json({
            error: false,
            status: 201,
            message: "Question Added successfully",
            totalQuestion: totalQuestion,
            uploadedQuestion: total_updated
        });

    } catch (error) {
        res.status(501).json({
            error: true,
            status: 501,
            message: error.message
        })
    }
}

const chieldQuestion = async (req, res) => {
    try {
        const QuestionData = await Question.find({
            chield_subject_id: req.params.chield_subject_id
        });
        res.status(201).json({
            error: false,
            status: 201,
            data:QuestionData
        })
    } catch (error) {
        res.status(501).json({
            error: true,
            status: 501,
            message: error.message
        })
    }
}
const deleteChieldQuestion = async (req, res) => {
    try {
        await Question.deleteMany({ "chield_subject_id": req.params.chield_subject_id}).then(response => {
            return res.status(201).json({
                message: "subject, deleted successfully"
            })
        });
    } catch (error) {
        res.send({
            error: true,
            code: 501,
            message: error.message
        })
    }
}

const getAllQuestions = async (req, res) => {
    try {
        let pageno = parseInt(req.params.pageno);
        let limit = parseInt(req.params.limit);
        const myCustomLabels = {
            totalDocs: 'itemCount',
            docs: 'itemsList',
            limit: 'perPage',
            page: 'currentPage',
            nextPage: 'next',
            prevPage: 'prev',
            totalPages: 'pageCount',
            pagingCounter: 'slNo',
            meta: 'paginator',
          };
        const options = {
            page: pageno,
            limit: limit,
            customLabels: myCustomLabels,
            collation: {
              locale: 'en',
            },
            sort: {
                created_at: -1 
            }
        };
        let query = {type:'QA',flag:req.params.filter,subject_id:req.params.subject_id,sub_subject_id:req.params.sub_subject_id}  

        await Question.paginate(query, options).then(result => {
            return res.status(200).json({
                data: result.itemsList,
                itemCount: result.paginator.itemCount,
                perPage: result.paginator.perPage,
                currentPage: result.paginator.currentPage,
                pageCount: result.paginator.pageCount,
                next: result.paginator.next,
                prev: result.paginator.prev,
                slNo: result.paginator.slNo,
                hasNextPage: result.paginator.hasNextPage,
                hasPrevPage: result.paginator.hasPrevPage
            });
        });
    } catch (error) {
        console.log(error)
        res.send({
            error: true,
            code: 501,
            message: error.message
        })
    }
}

const getAllQuestions50 = async (req, res) => {
    try {
        let pageno = parseInt(req.params.pageno);
        let limit = parseInt(req.params.limit);
        const myCustomLabels = {
            totalDocs: 'itemCount',
            docs: 'itemsList',
            limit: 'perPage',
            page: 'currentPage',
            nextPage: 'next',
            prevPage: 'prev',
            totalPages: 'pageCount',
            pagingCounter: 'slNo',
            meta: 'paginator',
          };
        const options = {
            page: pageno,
            limit: limit,
            customLabels: myCustomLabels,
            collation: {
              locale: 'en',
            },
            sort: {
                created_at: -1 
            }
        };
        let query = {type:'ASK50',flag:req.params.filter,subject_id:req.params.subject_id,sub_subject_id:req.params.sub_subject_id}  

        await Question.paginate(query, options).then(result => {
            return res.status(200).json({
                data: result.itemsList,
                itemCount: result.paginator.itemCount,
                perPage: result.paginator.perPage,
                currentPage: result.paginator.currentPage,
                pageCount: result.paginator.pageCount,
                next: result.paginator.next,
                prev: result.paginator.prev,
                slNo: result.paginator.slNo,
                hasNextPage: result.paginator.hasNextPage,
                hasPrevPage: result.paginator.hasPrevPage
            });
        });
    } catch (error) {
        console.log(error)
        res.send({
            error: true,
            code: 501,
            message: error.message
        })
    }
}

const getQuestionsFlagBased = async (req, res) => {
    try {
        console.log("dsadsd")
        let pageno = parseInt(req.params.pageno);
        let limit = parseInt(req.params.limit);
        let flag = req.params.flag;
        const myCustomLabels = {
            totalDocs: 'itemCount',
            docs: 'itemsList',
            limit: 'perPage',
            page: 'currentPage',
            nextPage: 'next',
            prevPage: 'prev',
            totalPages: 'pageCount',
            pagingCounter: 'slNo',
            meta: 'paginator',
          };
        const options = {
            page: pageno,
            limit: limit,
            customLabels: myCustomLabels,
            collation: {
              locale: 'en',
            },
            sort: {
                created_at: -1 
            }
        };
        let query = {};
        if(req.params.sub_subject_id){
            query = {type:'QA', flag:`${flag}`,subject_id:req.params.subject_id,sub_subject_id:req.sub_subject_id}  
        }else{
            query = {type:'QA', flag:`${flag}`}    
        }
        await Question.paginate(query, options).then(result => {
            return res.status(200).json({
                data: result.itemsList,
                itemCount: result.paginator.itemCount,
                perPage: result.paginator.perPage,
                currentPage: result.paginator.currentPage,
                pageCount: result.paginator.pageCount,
                next: result.paginator.next,
                prev: result.paginator.prev,
                slNo: result.paginator.slNo,
                hasNextPage: result.paginator.hasNextPage,
                hasPrevPage: result.paginator.hasPrevPage
            });
        });
    } catch (error) {
        res.send({
            error: true,
            code: 501,
            message: error.message
        })
    }
}

const GetSingleQuestion = async (req, res) => {
    try {

        const results = await Question.findOne({
            "_id": `${req.params.q_id}`
        });
        res.status(200).json({
            results
        });
    } catch (error) {
        res.send({
            error: true,
            code: 501,
            message: error.message
        })
    }
}

const UpdateAnswer = async (req, res) => {
    try {
        let update = req.body
        update.flag = "answered"
        delete update.user_Id;
        const response = await Question.findByIdAndUpdate({ _id: req.params.q_id }, update);
        if(response){
            const notifyData = {
                // {_id:ObjectId('615c053b853c3902f351f007')}
                title: response.question,
                info: `<p>Your question has been solved <strong>${response.question?.substr(0,100)}</strong></p>`,
                type: 'QA',
                user_Id: response.user_Id,
            }
            console.log(notifyData);
            const noti = new Notify(notifyData);
            const dt = await noti.save();
            const student = await Student.findOne({_id:response.user_Id});
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.email,
                    pass: process.env.password
                }
            });
            const output = emails.ask50Solution(student.Name, response.question, update.shortanswer, update.completeanswer)
            var mailOptions = {
                from: process.env.email,
                to: student.Email,
                subject: 'Your Homework Answer is ready!',
                html: output
            };
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            return res.status(201).json({
                message: "Question, Updated"
            })
        }
    } catch (error) {
        res.send({
            error: true,
            code: 501,
            message: error.message
        })
    }
}

const UpdateAnswer50 = async (req, res) => {
    try {
        let update = req.body
        update.flag = "answered"
        delete update.user_Id;
        const response = await Question.findByIdAndUpdate({ _id: req.params.q_id }, update);
        if(response){
            const notifyData = {
                // {_id:ObjectId('615c053b853c3902f351f007')}
                title: response.question,
                info: `<p>Your question has been solved <strong>${response.question?.substr(0,100)}</strong></p>`,
                type: 'ASK50',
                user_Id: response.user_Id,
            }
            console.log(notifyData);
            const noti = new Notify(notifyData);
            const dt = await noti.save();
            const student = await Student.findOne({_id:response.user_Id});
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.email,
                    pass: process.env.password
                }
            });
            const output = emails.ask50Solution(student.Name, response.question, update.shortanswer, update.completeanswer)
            var mailOptions = {
                from: process.env.email,
                to: student.Email,
                subject: 'Your Homework Answer is ready!',
                html: output
            };
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            return res.status(201).json({
                message: "Question, Updated"
            })
        }
    } catch (error) {
        res.send({
            error: true,
            code: 501,
            message: error.message
        })
    }
}

const RejectQuestion50 = async (req, res) => {
    try {
        let update = req.body
        update.flag = "rejected"
        delete update.user_Id;
        const response = await Question.findByIdAndUpdate({ _id: req.params.q_id }, update);
            if(response){
                if(update.assignment){
                    let content = {};
                    content.question = response.question;
                    content.subject = response.subject;
                    content.sub_subject = response.sub_subject;
                    content.subject_id = response.subject_id;
                    content.sub_subject_id = response.sub_subject_id;
                    content.user_id = response.user_Id;
                    content.image0 = response.image0;
                    content.image1 = response.image1;
                    const assign = await new Assignment(content).save()
                }
                const notifyData = {
                    // {_id:ObjectId('615c053b853c3902f351f007')}
                    title: response.question,
                    info: `<p>Your question  <strong> ${response.question?.substr(0,100)}</strong> has been rejected</p>`,
                    type: 'ASK50',
                    user_Id: response.user_Id,
                }
                const noti = new Notify(notifyData);
                const dt = await noti.save();
                const student = await Student.findOne({_id:response.user_Id});
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.email,
                        pass: process.env.password
                    }
                });
                const output = emails.ask50Rejection(student.Name, response.question, update.rejectionReason, update.rejectionReason1)
                var mailOptions = {
                    from: process.env.email,
                    to: student.Email,
                    subject: 'Your question has been rejected!',
                    html: output
                };
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                return res.status(201).json({
                    message: "Question Rejected"
                })
            }       
    } catch (error) {
        console.log(error.message)
        res.send({
            error: true,
            code: 501,
            message: error.message
        })
    }
}

module.exports = {
    importData,
    chieldQuestion,
    deleteChieldQuestion,
    getAllQuestions,
    getAllQuestions50,
    getQuestionsFlagBased,
    GetSingleQuestion,
    UpdateAnswer,
    UpdateAnswer50,
    RejectQuestion50,
}