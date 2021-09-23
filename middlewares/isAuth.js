const jwt = require('jsonwebtoken');
const User = require('../model/User')

const isAuth = async(req, res, next)=>{

    const bearerToken = req.headers.authorization
    
    if(!bearerToken|| bearerToken === undefined) return res.status(401).send({message: "no token"})
    const token = bearerToken.substring(7)
    if(!token.trim()) return res.status(401).send({message: "provide a valid token"})

    const decoded = jwt.decode(token, "TOKENSTRING")
    if(!decoded) return res.status(401).send({message:"no token"})
    const id = decoded.id
    try {
        const user = await User.findOne({_id: id})
        if(!user) return res.status(401).send({message: "provide a valid token"})
        req.user = decoded
        next()
    } catch (error) {
        console.log(error)
        return res.status(200).send({messege: error.message})
    }
    
}

module.exports =isAuth