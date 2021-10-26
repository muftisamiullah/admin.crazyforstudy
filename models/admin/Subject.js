const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    qa_seo_details : Object,
    textbook_seo_details : Object ,
    total_books: {
        type: Number,
        default: 0,
    },
    status:{
        type: Boolean,
        required: true,
        default: true
    },

    created_at:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Subject', SubjectSchema);