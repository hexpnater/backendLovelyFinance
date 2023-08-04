const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())
app.get('/', function (request, response) {
  response.send('Hello World (Finally)');
});

app.use(express.json())
const mongoose = require("mongoose")

const user = require("./router/user")

mongoose.Promise = global.Promis
mongoose.set('strictQuery', true)

mongoose.connect('mongodb+srv://homeservice:expinator504@homeservice.jnkxr.mongodb.net/dex_lovely_finance', {

    useNewUrlParser: true, useUnifiedTopology: true

}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
})

app.use(express.urlencoded({ extended: true }))
app.use("/upload", express.static("upload"))

app.use("/" , user)

const PORT = 3232;


app.listen(PORT ,()=>{
    console.log(`Server is running at ${PORT}`);
})



