const { generateToken } = require('../config/jwToken')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

//Create a new User
exports.createUser = asyncHandler(async (req, res) => {
    const email = req.body.email
    const findUser = await User.findOne({ email })
    if (!findUser) {
        const newUser = await User.create(req.body)
        res.json(newUser)
    } else {
        throw new Error("User Already Exist")
    }
})

//Login a User
exports.loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const findUser = await User.findOne({ email })
    if (findUser && (await findUser.isPasswordMatched(password))) {
        res.json({
            _id: findUser?.id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
        })
    } else {
        throw new Error("Invalid Credentials")
    }
})

//Get all User
exports.getallUser = asyncHandler(async (res, req) => {
    try {
        const getUser = await User.find()
        res.json(getUser)
    }
    catch (error) {
        throw new Error(error)
    }
})