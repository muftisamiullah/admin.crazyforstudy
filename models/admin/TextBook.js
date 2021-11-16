const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const TextBookSchema = new mongoose.Schema({
    user_Id: {type: String},
    sid: {type: String},
    isbn: {type: String},
    book_name: {type: String},
    edition: {type: String},
    user_name: {type: String},
    authoring: { type: Boolean, default: false },
    inStock:{
        type: Boolean
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

TextBookSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('TextBook', TextBookSchema);