const { generateToken } = require('../config/jwToken')
const { generateRefreshToken } = require('../config/refreshToken')
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
    F
    const { email, password } = req.body
    const findUser = await User.findOne({ email })
    if (findUser && (await findUser.isPasswordMatched(password))) {
        const refreshToken = await generateRefreshToken(findUser?._id)
        const updateUser = await User.findByIdAndUpdate(
            findUser.id,
            {
                refreshToken: refreshToken,
            },
            { new: true }
        )
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000
        })
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

//Log in a Admin
exports.loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const findAdmin = await User.findOne({ email })
    if (findAdmin.role !== "admin") throw new Error("Not Authorized")
    if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
        const refreshToken = await generateRefreshToken(findAdmin?._id)
        const updateUser = await User.findByIdAndUpdate(
            findAdmin,
            {
                refreshToken: refreshToken,
            },
            { new: true }
        )
        res.json({
            _id: findAdmin?.id,
            firstname: findAdmin?.firstname,
            lastname: findAdmin?.lastname,
            email: findAdmin?.email,
            mobile: findAdmin?.mobile,
            token: generateToken(findAdmin?._id),
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