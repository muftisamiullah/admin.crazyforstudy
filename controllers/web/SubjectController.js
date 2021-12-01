const Sub_Subject = require('../../models/admin/SubSubject.js');
const Subject = require('../../models/admin/Subject.js');
const ChildSubjects = require('../../models/admin/ChieldSubject.js');
const Questions = require('../../models/admin/Question');
const Question = require('../../models/admin/Question');

const SubSubjects = async(req, res) => {
    try {
        const SubSubjects = await Sub_Subject.find({ subject: req.params.subject_name }, {  subject:1, sub_subject:1,_id:1, subject_id:1 }).collation( { locale: 'en', strength: 2 });
        const SubjectSeo = await Subject.findOne({ subject: req.params.subject_name }, {  textbook_seo_details:1, qa_seo_details:1 }).collation( { locale: 'en', strength: 2 });
        return res.status(200).json({
            data: SubSubjects,
            subject_seo: SubjectSeo
        });
    } catch (error) {
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}

const AllSubjects = async (req, res) => {
    try {
        const Subjects = await Subject.find({},{_id: 1, subject: 1});
        res.status(200).json({
            data: Subjects
        });
    } catch (error) {
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}

const GetChildSubjects = async (req, res) => {
    try {
        const childSubjects = await ChildSubjects.find({sub_subject:req.params.sub_subject_name});
        res.status(200).json({
            data: childSubjects
        });
    } catch (error) {
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}

const GetQuestionAndAnswers = async (req, res) => {
    try {
        const child = req.params.child_subject.replace(/-/g,' ');
        const childSubjects = await ChildSubjects.findOne({ "$or": [
            { "chield_subject": { "$regex": `^${req.params.child_subject}$`,'$options' : 'i'} }, 
            { "chield_subject": { "$regex": `^${child}$`,'$options' : 'i'}}
        ]});
        const child_subject_id = childSubjects.chield_subject_id
        const questions = await Questions.find({chield_subject_id:child_subject_id}).skip(req.body.pageno * req.body.limit).limit(parseInt(req.body.limit))
        const total = await Questions.countDocuments(Questions.find({ chield_subject_id: child_subject_id }));
        res.status(200).json({
            data: questions,
            total:total
        });
    } catch (error) {
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}

const GetQuestionAndAnswers2 = async (req, res) => {
    try {
        const questions = await Questions.find({sub_subject:req.params.sub_subject, subject:req.params.subject},{shortanswer:0, completeanswer:0}).skip(req.body.pageno * req.body.limit).limit(parseInt(req.body.limit))
        const SubSubjectSeo = await Sub_Subject.findOne({ sub_subject: req.params.sub_subject }, {  textbook_seo_details:1, qa_seo_details:1 }).collation( { locale: 'en', strength: 2 });
        const total = await Questions.countDocuments(Questions.find({ sub_subject: req.params.sub_subject, subject: req.params.subject }));
        res.status(200).json({
            data: questions,
            sub_subject_seo: SubSubjectSeo,
            total:total
        });
    } catch (error) {
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}

const GetAnswer = async (req, res) => {
    try {
        const questions = await Questions.findOne({_id:req.params._id},{completeanswer:0}).lean()
        const childSubject =  await ChildSubjects.findOne({chield_subject_id:questions?.chield_subject_id})
        questions.cheild_subject = childSubject?.chield_subject;
        res.status(200).json({
            data: questions,
        });
    } catch (error) {
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}

const GetAnswerSub = async (req, res) => {
    try {
        const questions = await Questions.findOne({_id:req.params._id}).lean()
        const childSubject =  await ChildSubjects.findOne({chield_subject_id:questions?.chield_subject_id})
        questions.cheild_subject = childSubject?.chield_subject;
        res.status(200).json({
            data: questions,
        });
    } catch (error) {
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}

const GetRandomThreeQuestions = async (req, res) => {
    try {
        // const questions = await Questions.find({sub_subject:req.params.sub_subject, subject:req.params.subject, old_qid: { $exists: true } },{shortanswer:0, completeanswer:0}).skip(Math.random).limit(parseInt(req.params.limit))
        const questions = await Questions.aggregate([
            { $match: { sub_subject:req.params.sub_subject_name, subject:req.params.subject_name, question: { $exists: true } }  },
            { $sample: { size: 3 } },
            {
                $project: {
                    completeanswer: 0,
                }
            }
        ]);
        res.status(200).json({
            data: questions,
        });
    } catch (error) {
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}



module.exports = {
    AllSubjects,
    SubSubjects,
    GetChildSubjects,
    GetQuestionAndAnswers,
    GetAnswer,
    GetAnswerSub,
    GetQuestionAndAnswers2,
    GetRandomThreeQuestions,
}