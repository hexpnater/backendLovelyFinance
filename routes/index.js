var express = require('express');
var router = express.Router();
const multer = require("multer")

const storage = multer.diskStorage({
  destination: "uploads",

  filename: function (req, file, cb) {
    console.log(file);

    // let name = `${Date.now().toString()}-${file.originalname}`;
    let name = `${Date.now().toString()}-${file.originalname}`;
    cb(null, name);
  },
});

const upload = multer({
  storage: storage,
});
let userController = require('../controller/usercontroller')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post("/add/data", upload.single("image"), userController.adddata)

router.get("/get/all", userController.get_all)

router.post("/update/data/:id", upload.single("image"), userController.updatedata)
router.delete("/delete/data/:id", userController.deletedata)
router.get("/geturldata", userController.geturldata)

module.exports = router;
