const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { use } = require('../router/authRoutes')

const authController ={
    
    registerNewUser:async(req,res)=>{

        const {email, password} = req.body
        if(!email) return res.status(400).send({message:"Please enter a valid email"})
        if(!password) return res.status(400).send({message:"Please enter a valid password"})

        try {
            
            const user = await User.findOne({email:req.body.email})
            if(user)  return res.status(400).send({ message:"user already exist"})

            const hashedPassword = await bcrypt.hash(req.body.password, 12)
            const newUser = new User({...req.body, password:hashedPassword})
            await newUser.save()
            return res.status(200).send({newUser, message:"registarion success"})
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    },
    userLogin:async(req,res)=>{
        const {email, password} = req.body

        if(!email) return res.status(400).send({message:"Please enter a valid email"})
        if(!password) return res.status(400).send({message:"Please enter a valid password"})
        
        try {
            const user = await User.findOne({email:email})
            if(!user)  return res.status(400).send({ message:"incorrect username and password"})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).send({user,message:"incorrect username and password"})

            const token = jwt.sign({id: user._id, isAdmin:user.isAdmin}, "TOKENSTRING", {expiresIn:'1d'})

            return res.status(200).send({...user._doc, password:"", token})
        } catch (error) {
            console.log(error)
            res.status(500).send({message: error.message})

        }
    },
    getAllUsers:async(req,res)=>{
        try {
            const allUsers = await User.find().select("-password")
            res.status(200).send(allUsers)

        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }

}

module.exports = authController