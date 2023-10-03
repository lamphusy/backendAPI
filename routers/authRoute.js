const express = require("express")
const { createUser, loginUserCtrl, loginAdmin, handleRefreshToken } = require("../controller/userCtrl")
const router = express.Router()
router.post("/register", createUser)
router.post("/login", loginUserCtrl)
router.post("/admin-login", loginAdmin)
router.post("refresh", handleRefreshToken)
module.exports = router