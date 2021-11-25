const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const TransactionSchema = new mongoose.Schema({ 
    order_id: 'string', 
    payment_id: 'string', 
    type: 'string', 
    signature: 'string', 
    OrderDate: {
        type: Date,
        default: Date.now
    }, 
    status: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    } 
});

const AssignmentSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    sub_subject_id: {
        type: mongoose.Schema.ObjectId,
    },
    subject_id: {
        type: mongoose.Schema.ObjectId,
    },
    tutor_id: {
        type: mongoose.Schema.ObjectId,
    },
    tutor_name: {
        type: String,
    },
    subject: {
        type: String,
    },
    sub_subject: {
        type: String,
    },
    question:{
        type: String,
    },
    image0:{
        type: String,
    },
    amount:{
        type:Number,
    },
    deadline_time:{
        type: String,
    },
    deadline_date:{
        type: String,
    },
    pages:{
        type: Number,
    },
    order_id:{
        type: String,
    },
    reference:{
        type: String,
    },
    referenceString:{
        type: String,
    },
    payment_status:{
        type: String,
        default: "unpaid"
    },
    type:{
        type: String,
        default: "assignment"
    },
    assignment_status:{
        type: String,
        default: "pending"
    },
    transactions: {
        type: [TransactionSchema]
    },
    image1:{
        type: String,
    },
    image2:{
        type: String,
    },
    solutionHalf:{
        type: String,
    },
    solutionFull:{
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
},
{
    autoCreate: true,
    autoIndex: true
}
);

AssignmentSchema.plugin(mongoosePaginate);
AssignmentSchema.index({'assignment_status': 1},{unique:false});
AssignmentSchema.index({'subject_id': 1, 'sub_subject_id': 1},{unique:false});
AssignmentSchema.index({'assignment_status': 1,'subject_id': 1, 'sub_subject_id': 1},{unique:false});
AssignmentSchema.index({'assignment_status': 1,'subject_id': 1, 'sub_subject_id': 1, 'payment_status':1},{unique:false});
module.exports = mongoose.model('Assignment', AssignmentSchema);