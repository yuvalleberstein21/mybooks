const express = require('express');
const dotenv = require("dotenv");
const connectDatabase = require('./config/MongoDB');
const userRoutes = require('./Routes/UserRoutes');
const booksRouter = require('./Routes/BooksRoutes');
const cors = require('cors')


dotenv.config();
connectDatabase();

const app = express();
app.use(express.json());

var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}
app.use(cors(corsOptions))

var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


app.use("/api/users", userRoutes);
app.use("/api/books", booksRouter);

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server run on port ${PORT}`));