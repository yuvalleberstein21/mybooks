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


// const allowedOrigins = ['https://mybooks-eight.vercel.app/'];
// const corsOptions = {
//     origin: function (origin, callback) {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     optionsSuccessStatus: 200,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
// };
// app.use(cors(corsOptions));

// Handle OPTIONS requests for all routes
app.options('*', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'https://mybooks-eight.vercel.app');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.send();
});

app.get('/', (req, res) => {
    res.send('Server is running');
});

// ERROR Handler
app.use(notFound);
app.use(errorHandler);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


app.use("/api/users", userRoutes);
app.use("/api/books", booksRouter);

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server run on port ${PORT}`));