const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const QuestionSchema = new mongoose.Schema({
    old_qid:{type: String},
    uuid:{type: String},
    subject:{type: String},
    subject_id:{type: mongoose.Schema.ObjectId},
    sub_subject:{type: String},
    sub_subject_id:{type: mongoose.Schema.ObjectId},
    chield_subject_id:{type: String},
    book_isbn:{type: String},
    book_name:{type: String},
    book_edition:{type: String},
    chapter_no:{type: String},
    problem_no:{type: String},
    question:{
        type: String,
    },
    image0:{
        type: String,
    },
    image1:{
        type: String,
    },
    shortanswer:{
        type: String,
    },
    completeanswer:{
        type: String,
    },
    price: {
        type: String,
        default: 3
    },
    user_Id: {
        type: String
    },
    user_role: {
        type: String
    },
    type: {
        type: String
    },
    flag: {
        type: String,
        default: 'pending'
    },
    isChecked: {
        type: Boolean,
        default: 0
    },
    rejectionReason: {
        type: String
    },
    rejectionReason1: {
        type: String
    },
    status: {
        type: Boolean,
        default: 0
    },
    last_submition: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date
    }
},{
    autoCreate: true, // auto create collection
    autoIndex: true, // auto create indexes
  });

QuestionSchema.plugin(mongoosePaginate);
 QuestionSchema.index({'subject_id': 1, 'sub_subject_id': 1},{unique:false});
module.exports = mongoose.model('Question', QuestionSchema);