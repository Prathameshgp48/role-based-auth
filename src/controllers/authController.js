import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

const register = async(req, res) =>{
    try {
        const {email, username, password, role} = req.body
    
        if(!email || !username || !password || !role) {
            return res.status(502).json({message: "All fields are required!"})
        }
    
        const existingUser = await User.findOne({email})
        if(existingUser) {
            return res.status(500).json({message: "User already exists"})
        }
    
        const hashedPassword = await bcrypt.hash(password, 10)
    
        const newUser = new User({
            email,
            username,
            password: hashedPassword,
            role
        })
    
        await newUser.save()
    
        res.status(200).json({message: "User registered succesfully"})
    } catch (error) {
        res.status(500).json({message: "Something went wrong", err: error.message})
    }
}

const login = async(req, res) => {
    try {
        const {email, password} = req.body
    
        if(!email || !password) {
            return res.status(502).json({message: "All fields are required!"})
        }
    
        const existingUser = await User.findOne({email})
        if(!existingUser) {
            return res.status(500).json({message: "User not found"})
        }
    
        const matchPassword = await bcrypt.compare(password, existingUser.password)

        if(!matchPassword) {
            res.status(500).json({message: "Invalid Credentials"})
        }

        const token = jwt.sign({
            id: existingUser._id,
            role: existingUser.role,
        },
         process.env.JWT_SECRET,
         {
            expiresIn: "10h"
         }
        )
    
        res.status(200).json({message: "User logged-in succesfully", token: token})
    } catch (error) {
        res.status(500).json({message: "Something went wrong", err: error.message})
    }
}

export {
    register,
    login
}