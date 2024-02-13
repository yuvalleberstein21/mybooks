const express = require('express');
const dotenv = require("dotenv");
const connectDatabase = require('./config/MongoDB');
const userRoutes = require('./Routes/UserRoutes');
const booksRouter = require('./Routes/BooksRoutes');
const cors = require('cors');
const { notFound, errorHandler } = require('./middleware/Erros');


dotenv.config();
connectDatabase();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Allow only specific origins
const allowedOrigins = ['https://mybooks-fro.vercel.app/'];

// Apply CORS middleware with options
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
}));



app.get('/', (req, res) => {
    res.send('Server is running');
});

// ERROR Handler
app.use(notFound);
app.use(errorHandler);




app.use("/api/users", userRoutes);
app.use("/api/books", booksRouter);

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server run on port ${PORT}`));