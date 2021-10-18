const mongoose = require('mongoose');

const Dummy1Schema = new mongoose.Schema({
    ISBN: {
        type: String,
    },
    BookName: {
        type: String,
    },
});

module.exports = mongoose.model('Dummy1', Dummy1Schema);