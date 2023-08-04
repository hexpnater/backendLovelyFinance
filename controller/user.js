const usermodel = require("../model/user")


exports.adddata = async (req, res) => {
    try {

        const { mainHeading, secondHeading, innerText } = req.body



        const add = await usermodel.create({
            mainHeading: mainHeading,
            secondHeading: secondHeading,
            innerText: innerText,
            image: req.file.filename
        })

        res.send({ status: true, message: "Successfully add data", details: add })

    } catch (error) {
        res.send({ status: false, message: "Something went wrong!!" })
    }
}


exports.get_all = async (req, res) => {
    try {

        const getall = await usermodel.find()

        res.send({ status: true, message: "Successfully get data", details: getall })

    } catch (error) {
        res.send({ status: false, message: "Something went wrong!!" })
    }
}
exports.deletedata = async (req, res) => {
    try {
        const findByid = await usermodel.findById(req.params.id)
        if(findByid){
            const findByid = await usermodel.deleteOne({ _id: req.params.id })
            res.send({ status: true, message: "data deleted Successfully" })
        }else{
            res.send({ status: false, message: "data can not deleted" })
        }


    } catch (error) {
        res.send({ status: false, message: "Something went wrong!!" })
    }
}

exports.updatedata = async (req, res) => {
    try {
        const { mainHeading, secondHeading, innerText } = req.body

        const findByid = await usermodel.findById(req.params.id)

        const protocol = req.protocol;
        const host = req.hostname;
        const fullUrl = `${protocol}://${host}`

        const update = await usermodel.findByIdAndUpdate(req.params.id, {
            mainHeading: mainHeading,
            secondHeading: secondHeading,
            innerText: innerText,
            image: req.file ? fullUrl + "/" + "upload/" + req.file.filename :
                findByid.image,

        }, { new: true })

        await update.save()

        res.send({status : true , message : "Successfully update data" ,data : update })

    } catch (error) {
        res.send({ status: false, message: "Something went wrong!!" })
    }
}
