const mongoose = require('mongoose');

const DummySchema = new mongoose.Schema({
    ISBN: {
        type: String,
    },
    questions: {
        type: String,
    },
    solutions:{
        type: String,
    },
});

module.exports = mongoose.model('Dummy', DummySchema);