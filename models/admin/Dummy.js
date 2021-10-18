const mongoose = require('mongoose');

const DummySchema = new mongoose.Schema({
    ISBN: {
        type: String,
    },
    BookName: {
        type: String,
    },
    Status: {
        type: String,
    },
    Priority: {
        type: String,
    },
    Available:{
        type: String,
    },
    Questions:{
        type: String,
    },
    pq_type:{
        type: String,
    },
    Solutions:{
        type: String,
    },
});

module.exports = mongoose.model('Dummy', DummySchema);