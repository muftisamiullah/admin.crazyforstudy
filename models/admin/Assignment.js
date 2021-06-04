const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
    user_id:{
        type: String,
        required: true,
    },
    sub_subject_id: {
        type: String,
    },
    subject_id: {
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
    image:{
        type: String,
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
    reference:{
        type: String,
    },
    image:{
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Assignment', AssignmentSchema);