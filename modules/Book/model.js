const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    userId: mongoose.SchemaTypes.ObjectId,
    title: String,
    author: String,
    category: String,
    file: String
},
{
    timestamps: true
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
