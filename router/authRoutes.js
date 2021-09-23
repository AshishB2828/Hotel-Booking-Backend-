const authController = require('../controllers/authController')
const isAdmin = require('../middlewares/isAdmin')
const isAuth = require('../middlewares/isAuth')
const router = require('express').Router()

router.post("/register", authController.registerNewUser )
router.post("/login", authController.userLogin )
router.get("/all-user",isAuth,isAdmin, authController.getAllUsers)

module.exports = router