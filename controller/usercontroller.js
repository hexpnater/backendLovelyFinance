const usermodel = require("../model/user")
const axios = require('axios');
const cheerio = require('cheerio');
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
        if (findByid) {
            const findByid = await usermodel.deleteOne({ _id: req.params.id })
            res.send({ status: true, message: "data deleted Successfully" })
        } else {
            res.send({ status: false, message: "data can not deleted" })
        }


    } catch (error) {
        res.send({ status: false, message: "Something went wrong!!" })
    }
}
exports.geturldata = async (req, res) => {
    try {

        const response = await axios.get("https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest", {
            headers: {
                'X-CMC_PRO_API_KEY': process.env.API_KEY_coinmarketcap,
            },
            // params: {
            //     limit: 10, // Number of cryptocurrencies to retrieve
            //     convert: 'USD', // Convert prices to USD
            // },
        });
        const data = response.data.data;
        const formattedData = data.map((coin) => ({
            name: coin.name,
            price: `${coin.quote.USD.price}`,
            priceChange: `${coin.quote.USD.percent_change_24h}%`,
            volume: `${coin.quote.USD.volume_24h}`,
            //tvl: `${coin.quotes.volume}`,
        }));

        res.send({ status: true, message: "Successfully get data", details: formattedData })
    } catch (error) {
        console.log('Error:', error);
        return null;
    }

}

exports.updatedata = async (req, res) => {
    try {
        const { mainHeading, secondHeading, innerText } = req.body

        const findByid = await usermodel.findById(req.params.id)

        const protocol = req.protocol;
        const host = req.hostname;
        const fullUrl = process.env.URL
        console.log("#######3", process.env.URL)
        let update = await usermodel.findByIdAndUpdate(req.params.id, {
            mainHeading: mainHeading,
            secondHeading: secondHeading,
            innerText: innerText,
            image: req.file ? req.file.filename : "",
        }, { new: true })

        await update.save()

        res.send({ status: true, message: "Successfully update data", data: update })

    } catch (error) {
        res.send({ status: false, message: error.message })
    }
}
