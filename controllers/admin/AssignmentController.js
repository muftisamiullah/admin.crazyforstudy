const Assignment = require('../../models/admin/Assignment');
const Tutor = require('../../models/tutor/Tutor');
const Notify = require('../../models/admin/Notification.js');
const Student = require('../../models/student/Student');
const Admin = require('../../models/admin/Admin');
const emails = require('../../emails/emailTemplates');
var nodemailer = require('nodemailer');

const getAssignmentAll = async (req, res) => {
    try {
        let filter = {}; 
        // { assignment_status: req.params.filter}
        if(req.params.subject != "undefined"){
            filter.subject_id = req.params.subject
        }
        if(req.params.sub_subject != "undefined"){
            filter.sub_subject_id = req.params.sub_subject
        }
        if(req.params.pfilter != "undefined"){
            filter.payment_status = req.params.pfilter
        }
        if(req.params.filter != "undefined"){
            filter.assignment_status = req.params.filter
        }
        const assignment = await Assignment.find(filter).sort({created_at: -1});
        if(assignment){
            return res.status(200).json({
                error: false,
                message: "Assignment data",
                assignment:assignment
            });
        }
    } catch (error) {
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}

const getSingleAssignment = async (req, res) => {
    try {

        const results = await Assignment.findOne({
            "_id": `${req.params.id}`
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

const updateSingleAssignment = async (req, res) => {
    try {
        let update = req.body
        update.assignment_status = "answered"
        update.updated_at = Date.now()
        if(req.files.file1){
            update.solutionHalf = req.files.file1 && req.files.file1[0].filename;
        }
        if(req.files.file2){
            update.solutionFull = req.files.file2 && req.files.file2[0].filename; 
        }   
        delete update.user_Id;
        const response = await Assignment.findByIdAndUpdate({ _id: req.params.id }, update);
        if(response){
            const ques = response.question.substr(0,100);
            const notifyData = {
                // {_id:ObjectId('615c053b853c3902f351f007')}
                title: response.question,
                info: `<p>Your Assignment has been solved <strong>${ques}</strong></p>`,
                type: 'ASSIGNMENT',
                user_Id: response.user_id,
                isRead: false,
                created_at: Date.now()
            }
            var localDate = new Date(response.deadline_date);
            var localCDate = new Date(response.created_at);
            newDeadlineDate = localDate.toLocaleString();
            newCreatedAtDate = localCDate.toLocaleString();

            const d = await Notify.findOneAndUpdate({ data_Id: req.params.id, type:'ASSIGNMENT' }, notifyData);
            // const noti = new Notify(notifyData);
            // const dt = await noti.save();
            const student = await Student.findOne({_id:response.user_id});
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.email,
                    pass: process.env.password
                }
            });
            const output = emails.assignmentSubmitUserSolution(student.Name, ques, update.answer, req.params.id, newCreatedAtDate, newDeadlineDate)
            var mailOptions = {
                attachments: [
                    {
                        // filename: req?.files?.file1[0].filename,
                        path: process.env.s3Path + req?.files?.file1[0].filename,
                    }, // stream this file
                    {
                        // filename: req?.files?.file2[0].filename,
                        path: process.env.s3Path + req?.files?.file2[0].filename,
                    } // stream this file
                ],
                from: process.env.email,
                to: student.Email,
                subject: 'Your Assignment is ready!',
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
                message: "Assignment Updated"
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

module.exports = { 
    getAssignmentAll,
    getSingleAssignment,
    updateSingleAssignment,
}