const mongoose = require("mongoose")

const userschema = mongoose.Schema({

    mainHeading : {type : String , require : true}  ,

    secondHeading : {type : String , require : true} ,

    innerText : {type : String , require : true} ,

    image : {type : String , default : ""}

},
    {
        timestamps: true,
    }

)

module.exports = mongoose.model("user", userschema)