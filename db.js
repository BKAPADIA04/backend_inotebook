const mongoose = require('mongoose');
const mongoUri = "mongodb://127.0.0.1:27017/inotebook";


const connectToMongo = async () => {
    await mongoose.connect(mongoUri);
    console.log("Database Connected Successfully");
}

module.exports = connectToMongo;