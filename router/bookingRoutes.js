const bookingController = require('../controllers/bookingController')

const router = require('express').Router()

router.post('/bookroom', bookingController.bookRoom)

module.exports = router