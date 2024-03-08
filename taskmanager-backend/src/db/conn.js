const mongoose = require("mongoose");

const databaseUrl = "mongodb://localhost:27017/taskmanager";

const connectDb = async () => {

    try {
        
        await mongoose.connect(databaseUrl);

    } catch (error) {
        
        console.log("error=>", error);
    }
    
}

module.exports = connectDb;