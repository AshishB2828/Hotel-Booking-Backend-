const authController = require('../controllers/authController')
const router = require('express').Router()

router.post("/register", authController.registerNewUser )
router.post("/login", authController.userLogin )

module.exports = router