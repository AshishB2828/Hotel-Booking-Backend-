const User = require('../model/User')
const bcrypt = require('bcryptjs')

const authController ={
    
    registerNewUser:async(req,res)=>{
        try {
            const user = await User.findOne({email:req.body.email})
            if(user)  return res.status(400).send({ message:"user already exist"})

            const hashedPassword = await bcrypt.hash(req.body.password, 12)
            const newUser = new User({...req.body, password:hashedPassword})
            await newUser.save()
            return res.status(200).send({newUser, message:"registarion success"})
        } catch (error) {
            console.log(error)
            res.status(500).send({message: error.message})
        }
    },
    userLogin:async(req,res)=>{
        const {email, password} = req.body
        try {
            const user = await User.findOne({email:email})
            if(!user)  return res.status(400).send({ message:"user does not exist"})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).send({user,message:" login failed"})

            return res.status(200).send({...user._doc, password:""})
        } catch (error) {
            console.log(error)
            res.status(500).send({message: error.message})

        }
    }

}

module.exports = authController