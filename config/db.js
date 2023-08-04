const mongoose = require("mongoose");
mongoose.set('strictQuery', true)
const connectDb = () => {
    // Set up default mongoose connection
    const mongoDB = `mongodb+srv://homeservice:expinator504@homeservice.jnkxr.mongodb.net/dex_lovely_finance`;
    mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(_ => console.log("Database Connected!")).catch(err => console.log(err));
}

module.exports = connectDb;