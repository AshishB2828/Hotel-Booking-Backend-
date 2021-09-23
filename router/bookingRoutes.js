const bookingController = require('../controllers/bookingController')
const isAdmin = require('../middlewares/isAdmin')
const isAuth = require('../middlewares/isAuth')

const router = require('express').Router()

router.post('/bookroom',isAuth, bookingController.bookRoom)
router.post('/my-bookings',isAuth, bookingController.getBookingsByUserId)
router.post('/cancel',isAuth, bookingController.cancelBookingById)
router.get('/all-bookings',isAuth,isAdmin, bookingController.getAllBookings)

module.exports = router