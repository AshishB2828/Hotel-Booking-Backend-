const bookingController = require('../controllers/bookingController')

const router = require('express').Router()

router.post('/bookroom', bookingController.bookRoom)
router.post('/my-bookings', bookingController.getBookingsByUserId)
router.post('/cancel', bookingController.cancelBookingById)

module.exports = router