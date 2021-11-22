const Assignment = require('../../models/admin/Assignment');
const Tutor = require('../../models/tutor/Tutor');
const Notify = require('../../models/admin/Notification.js');
const Admin = require('../../models/admin/Admin');
const emails = require('../../emails/emailTemplates');
var nodemailer = require('nodemailer');

const saveAssignmentOne = async (req, res) => {
    try {
        const content = {question: req.body.question,subject: req.body.subject, sub_subject: req.body.sub_subject, subject_id: req.body.subject_id,sub_subject_id:req.body.sub_subject_id,user_id:req.body.user_Id,image0:req.files?.image0 ? req?.files?.image0[0].filename : '',image1:req.files?.image1 ? req?.files?.image1[0].filename : '',image2:req.files?.image2 ? req?.files?.image2[0].filename : '',};
        const assign = await new Assignment(content).save()
        if(assign){
            return res.status(200).json({
                error: false,
                message: "Assignment inserted",
                assign
            });
        }
    } catch (error) {
        console.log(error)
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}

const saveAssignmentLocal = async (req, res) => {
    try {
        const tutor = await Tutor.aggregate([
            { $sample: { size: 1 } }
        ]);
        const content = {   
                            question: req.body.question,subject: req.body.subject, 
                            sub_subject: req.body.sub_subject, subject_id: req.body.subject_id,
                            sub_subject_id:req.body.sub_subject_id,user_id:req.body.user_Id,
                            // image:req.file ? req.file.filename : '',
                            image0:req.files?.image0 ? req?.files?.image0[0].filename : '',image1:req.files?.image1 ? req?.files?.image1[0].filename : '',image2:req.files?.image2 ? req?.files?.image2[0].filename : '',
                            deadline_date: req.body.deadline_date,
                            deadline_time: req.body.deadline_time,pages: req.body.pages, 
                            reference: req.body.reference,
                            tutor_id: tutor[0]._id, tutor_name: tutor[0].fname +" "+tutor[0].lname,
                            type: req.body.type, link: req.body.link,email:req.body.email, referenceString:req.body.referenceString, amount:req.body.amount
                        };
        const assign = await new Assignment(content).save()
        if(assign){
            const notifyData = {
                info: `<p>You will get the answer for <strong>${assign.question?.substr(0,100)}</strong> within the provided deadline, Please be patient.</p>`,
                title: assign.question.substr(0,150),
                type: req.body.type,
                link: req.body.link,
                data_Id: assign._id,
                user_Id: req.body.user_Id,
            }
            const noti = new Notify(notifyData);
            const dt = await noti.save();

            var localDate = new Date(assign.deadline_date);
            newDate = localDate.toLocaleString();

            const admins = await Admin.find({ role:1 }, {email:1});
                
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.email,
                    pass: process.env.password
                }
            });
            const output = emails.assignmentSubmitUser(assign.question,assign.subject,assign.sub_subject, newDate)
            const outputAdmin = emails.assignmentSubmitAdmin(assign.question, assign.subject,assign.sub_subject, newDate)
            var mailOptionsAdmin = {
                from: process.env.email,
                to: admins,
                subject: 'A Student just posetd a New Assignment! Check now.',
                html: outputAdmin
            };

            var mailOptionsStudent = {
                from: process.env.email,
                to: req.body.email,
                subject: 'Assignment Recieved!',
                html: output
            };
            
            Promise.all([
                transporter.sendMail(mailOptionsStudent),
                transporter.sendMail(mailOptionsAdmin),
            ])
                .then((res) => console.log('Email sent: ' + res))
                .catch((err) => console.log(err));
                    
            return res.status(200).json({
                error: false,
                message: "Assignment inserted",
                assign
            });
        }
    } catch (error) {
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}

const saveAssignmentTwo = async (req, res) => {
    try {
        // console.log(req.body)
        // return;
        const tutor = await Tutor.aggregate([
            { $sample: { size: 1 } }
        ]);
        const filter = {_id:req.body.id,user_id:req.body.user_Id}
        const content = {   deadline_date: req.body.deadline_date,deadline_time: req.body.deadline_time, 
                            pages: req.body.pages, reference: req.body.reference,amount:req.body.amount,
                            tutor_id: tutor[0]._id, tutor_name: tutor[0].fname+" "+tutor[0].lname, referenceString: req.body.referenceString
                        };
        const assignment = await Assignment.findOneAndUpdate(filter, content);
        if(assignment){
            const notifyData = {
                info: `<p>You will get the answer for <strong>${assignment.question?.substr(0,100)}</strong> within the provided deadline, Please be patient.</p>`,
                title: assignment.question.substr(0,150),
                type: req.body.type,
                link: req.body.link,
                data_Id: assignment._id,
                user_Id: req.body.user_Id,
            }
            const noti = new Notify(notifyData);
            const dt = await noti.save();

            var localDate = new Date(assignment.deadline_date);
            newDate = localDate.toLocaleString();

            const admins = await Admin.find({ role:1 }, {email:1});
                
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.email,
                    pass: process.env.password
                }
            });
            const output = emails.assignmentSubmitUser(assignment.question,assignment.subject,assignment.sub_subject, newDate)
            const outputAdmin = emails.assignmentSubmitAdmin(assignment.question, assignment.subject,assignment.sub_subject, newDate)
            var mailOptionsAdmin = {
                from: process.env.email,
                to: admins,
                subject: 'A Student just posetd a New Assignment! Check now.',
                html: outputAdmin
            };

            var mailOptionsStudent = {
                from: process.env.email,
                to: req.body.email,
                subject: 'Assignment Recieved!',
                html: output
            };
            
            Promise.all([
                transporter.sendMail(mailOptionsStudent),
                transporter.sendMail(mailOptionsAdmin),
            ])
                .then((res) => console.log('Email sent: ' + res))
                .catch((err) => console.log(err));
                return res.status(200).json({
                    error: false,
                    message: "Assignment updated",
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

const getAssignmentInfo = async (req, res) => {
    try {
        const filter = {_id:req.body.id,user_id:req.body.user_Id}
        const assignment = await Assignment.findOne(filter);
        if(assignment){
            return res.status(200).json({
                error: false,
                message: "Assignment updated",
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

const getAssignmentAll = async (req, res) => {
    try {
        // return res.send(req.body.user_Id.user_Id)
        const filter = { user_id: req.body.user_Id.user_Id }
        const assignment = await Assignment.find(filter).sort({created_at: -1});
        if(assignment){
            return res.status(200).json({
                error: false,
                message: "Assignment updated",
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

module.exports = {
    saveAssignmentOne,
    saveAssignmentTwo,
    saveAssignmentLocal,
    getAssignmentInfo,
    getAssignmentAll,
}