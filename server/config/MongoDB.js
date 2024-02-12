const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected")
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1);
    }
};

module.exports = connectDatabase;