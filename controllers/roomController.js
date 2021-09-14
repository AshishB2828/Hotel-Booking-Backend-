const Room = require('../model/Room')


const roomController ={

    getallRooms: async(req, res)=>{

        try {
            const allrooms = await Room.find();
            return res.status(200).send({allrooms})
        } catch (error) {
            console.log(error.message)
        }
    },
    createRooms: async(req, res)=>{
        try {
            const newRoom = new Room(req.body) 
            await newRoom.save()
            return res.status(200).send({newRoom})
        } catch (error) {
            console.log(error.message)
        }
    }
}

module.exports = roomController