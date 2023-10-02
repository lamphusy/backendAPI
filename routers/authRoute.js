const express = require("express")
const { createUser, loginUserCtrl, loginAdmin } = require("../controller/userCtrl")
const router = express.Router()
router.post("/register", createUser)
router.post("/login", loginUserCtrl)
router.post("/admin-login", loginAdmin)
module.exports = router