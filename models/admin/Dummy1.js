const mongoose = require('mongoose');

const Dummy1Schema = new mongoose.Schema({
    ISBN13: {
        type: String,
    },
    BookName: {
        type: String,
    },
    total_question: {
        type: String,
    },
    question_uploaded: {
        type: String,
    },
});

module.exports = mongoose.model('Dummy1', Dummy1Schema);