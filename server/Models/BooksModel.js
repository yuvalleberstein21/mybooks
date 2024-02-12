const mongoose = require('mongoose');

const booksSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },
    bookName: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    summary: {
        type: String,
        require: true,
    },
    genre: {
        type: String,
        require: true,
    },
    spiciness: {
        type: String,
        require: true,
    },
    starRating: {
        type: Number,
        require: true,
        default: 0,
    },
    image_url: {
        type: String,
        require: true
    },
},
    {
        timestamps: true
    }
);

const Books = mongoose.model('Books', booksSchema);
module.exports = Books