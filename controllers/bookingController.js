const Booking = require('../model/Booking')
const Room = require('../model/Room')
const moment = require('moment')
const stripe = require('stripe')(process.env.STRIPE)
const {v4: uuidv4} =require('uuid') 

const bookingController = {

    bookRoom:async(req, res)=>{

            const {room,roomId,userId,fromDate,toDate,totalDays, totalAmount,token} = req.body
            if(!room || !roomId || !userId || !fromDate || !toDate || !totalDays || !totalAmount || !token)
            return res.status(400).json({message: "Booking Faild"})
            if(req.user.id !== userId) return res.status(403).send({message:"Permission Denied!"})
        try {
            if(!token.email) return res.status(400).json({message: "Booking Failed"})
            const customer = await stripe.customers.create({
                email: token.email, source: token.id
            })
            const totalAmount = req.body.totalAmount * 10
            const payment = await stripe.charges.create({
                amount: totalAmount,
                customer: customer.id,
                currency: 'inr',
                receipt_email: token.email
            },{idempotencyKey: uuidv4()})

            if(payment){
                const newBooking = new Booking({
                    ...req.body, transactionId: '123456', 
                    fromDate: req.body.fromDate,
                    toDate: req.body.toDate,
                })
                await newBooking.save()
                const room = await Room.findOne({_id: req.body.roomId})
                room.currentbookings.push(newBooking)
                await room.save()
                return res.status(200).send({message:"Payment succefull, room Booked", payment})
            }
            return res.status(400).send({message:"something went wrong, try again latter"})
        } catch (error) {
            console.log(error.message)
            res.status(500).send({message: error.message}) 
        }
    },
    getBookingsByUserId:async(req, res) => {
        const {id} = req.body
        if(!id) return res.status(400).send({message:"Please provide a valid User ID"})
       
        if(req.user.id !== id) return res.status(403).send({message:"Permission Denied!"})

        try {
            const myBookings= await Booking.find({userId: id});
            return res.status(200).json(myBookings)
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },
    cancelBookingById: async(req, res)=>{
        const {bookingId, roomId} = req.body
        
        if(!roomId) return res.status(400).send({message:"roomId required"})
        if(!bookingId) return res.status(400).send({message:"bookingId required"})

        // if(req.user.id !== userId) return res.status(403).send({message:"Permission Denied!"})

        try {

            const room  = await Room.findOne({_id: roomId})
            if(!room) return res.status(400).send({message: "no room found"})

            const booking = await Booking.findOne({_id: bookingId})
            if(!booking) return res.status(400).send({message:"No booking exist"})

            booking.status="cancel"
            booking.save()

           
            const bookings = room.currentbookings
            const temp = bookings.filter(x=> String(x._id)!== String(bookingId))
            room.currentbookings =  temp
            await room.save()
            return res.status(200).json("canceld")
        } catch (error) {
            return res.status(500).json({message: error.message})
            
        }
    },
    getAllBookings:async(req, res)=>{
        try {
            const allBookings = await Booking.find()
            return res.status(200).json(allBookings)
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }

}

module.exports = bookingController;