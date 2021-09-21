const Room = require('../model/Room')


const roomController ={

    getallRooms: async(req, res)=>{

        try {
            const allrooms = await Room.find();
            return res.status(200).send({allrooms})
        } catch (error) {
            console.log(error.message)
            res.status(500).send({message: error.message})

        }
    },
    createRooms: async(req, res)=>{
        try {
            const newRoom = new Room(req.body) 
            await newRoom.save()
            return res.status(200).send({newRoom})
        } catch (error) {
            console.log(error.message)
            res.status(500).send({message: error.message})

        }
    },
    getRoomById: async(req, res)=>{
        try {
            const room = await Room.findOne({_id:req.params.id});
            return res.status(200).send({room})
        } catch (error) {
            console.log(error.message)
            res.status(500).send({message: error.message})
        }
    },
}

module.exports = roomController