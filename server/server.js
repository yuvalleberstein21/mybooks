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
app.use(cors())


app.use("/api/users", userRoutes);
app.use("/api/books", booksRouter);

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server run on port ${PORT}`));