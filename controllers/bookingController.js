const Booking = require('../model/Booking')
const Room = require('../model/Room')
const moment = require('moment')
const stripe = require('stripe')('sk_test_51JbpmqSDxmkhmiTDm2S424fDoHI8nzYWqAnw2cozAvQCiRtH0HEKZDesB8zfNN28vWDkkotsrpppPruPcLE4BRca00hqQIc40i')
const {v4: uuidv4} =require('uuid') 

const bookingController = {

    bookRoom:async(req, res)=>{
            const {token} = req.body
            
        try {
            const customer = await stripe.customers.create({
                email: token.email, source: token.id
            })

            const payment = await stripe.charges.create({
                amount: req.body.totalAmount * 10,
                customer: customer.id,
                currency: 'inr',
                receipt_email: token.email
            },{idempotencyKey: uuidv4()})

            if(payment){
                const newBooking = new Booking({
                    ...req.body, transactionId: '123456', 
                    // fromDate: moment(req.body.fromDate).format('DD-MM-YYYY'),
                    fromDate: req.body.fromDate,
                    toDate: req.body.toDate,
                })
                await newBooking.save()
                const room = await Room.findOne({_id: req.body.roomId})
                room.currentbookings.push(newBooking)
                await room.save()
                return res.status(200).send({message:"Payment succefull, room Booked", payment})
            }
            return res.status(201).send({message:"something went wrong, try again latter"})
        } catch (error) {
            console.log(error.message)
            res.status(500).send({message: error.message}) 
        }
    }

}

module.exports = bookingController;