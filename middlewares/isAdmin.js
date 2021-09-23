
const isAdmin = async(req, res, next) =>{

    if(!req.user) return  res.status(403).send({message :"Permission denied"})
    if(!req.user.isAdmin) return res.status(403).send({message :"Permission denied"})
    
    next()

}
module.exports = isAdmin;