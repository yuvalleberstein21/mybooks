const express = require('express');
const Books = require('../Models/BooksModel');
const asyncHandler = require('express-async-handler');
const protect = require('../middleware/AuthMiddleware');


const booksRouter = express.Router();


// CREATE BOOK
booksRouter.post("/", protect, asyncHandler(
    async (req, res) => {
        const {
            bookName,
            author,
            summary,
            genre,
            spiciness,
            starRating,
            image_url
        } = req.body;

        if (bookName && bookName.length === 0) {
            res.status(400);
            throw new Error('No order items')

        } else {
            const book = new Books({
                user: req.user._id,
                bookName,
                author,
                summary,
                genre,
                spiciness,
                starRating,
                image_url,
            })

            const createBook = await book.save();
            res.status(201).json(createBook);
        }
    }
));



// GET BOOKS BY ID
booksRouter.get("/:id", asyncHandler(async (req, res) => {
    const userId = req.params.id;
    try {
        const books = await Books.find({ user: userId });
        if (books) {
            res.json(books);
        } else {
            res.status(404).json({ message: "Books Not Found" });
        }
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));

// DELETE BOOK
booksRouter.delete("/:id", asyncHandler(
    async (req, res) => {
        const book = await Books.findById(req.params.id);
        if (book) {
            await Books.deleteOne({ _id: req.params.id });
            res.json({ message: "book deleted successfully" });
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    }
));


module.exports = booksRouter;

