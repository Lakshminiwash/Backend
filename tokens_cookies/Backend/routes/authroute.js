const express = require("express")
const noteModel = require("../models/userModels")
const authRouter = express.Router()
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
require("dotenv").config()

authRouter.post("/register", async (req,res)=>{
    const {name,email,password} = req.body

    const isUserAlreadyExist = await noteModel.findOne({email})

    if(isUserAlreadyExist){
        return res.status(400).json({
            message:"user already exist with this email id"
        })
    }

     const hash = crypto.createHash("md5").update(password).digest("hex")

    const userData = await noteModel.create({
        name,email,password:hash
    })

    const token = jwt.sign({
        id:userData._id,
        email:userData.email
    },process.env.JWT_SECRET)

    res.cookie("jwt_token",token)

    res.status(201).json({
        message:"data posted",
        userData,
    })
})


authRouter.post("/login",async (req,res)=>{
    const {email,password} = req.body

    const user = await noteModel.findOne({email})

    if(!user){
        return res.status(404).json({
            message:"user not exist"
        })
    }

    const isPasswordMatch = user.password === crypto.createHash("md5").update(password).digest("hex")

    if(!isPasswordMatch){
        return res.status(401).json({
            message:"password is incorrect"
        })
    }

    const token = jwt.sign({
        id:user._id
    },"5e0a0d0ccfd0ffb7d16954868779a5d58923981e5ab20d4c8ae2e7ce")

    res.cookie("jwt_token",token)

    res.status(200).json({
        message:"user logged in",
        user
    })
})

module.exports = authRouter