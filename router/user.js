const express = require("express")
const router = express.Router()

const multer = require("multer")

const storage = multer.diskStorage({
  destination: "upload",

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


const usercontroller = require("../controller/user")

router.post("/add/data"  , upload.single("image") , usercontroller.adddata)

router.get("/get/all" , usercontroller.get_all)

router.post("/update/data/:id" , upload.single("image") , usercontroller.updatedata)
router.delete("/delete/data/:id", usercontroller.deletedata)

module.exports = router
