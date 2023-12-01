const mongoose = require("mongoose");

const connection = () => {
    const URL = process.env.MONGO_URL;

    try {
        mongoose.connect(URL);
        console.log('Database connected successfully');
    }
    catch (err) {
        console.log('Error while connecting with the database', err.message);
    }
}

module.exports = { connection };