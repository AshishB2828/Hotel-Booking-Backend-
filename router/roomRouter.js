const roomController = require('../controllers/roomController')
const isAdmin = require('../middlewares/isAdmin')
const isAuth = require('../middlewares/isAuth')
const router = require('express').Router()

router.get("/",roomController.getallRooms )
router.get("/:id", roomController.getRoomById )
router.post("/add",isAuth, isAdmin, roomController.createRooms )

module.exports = router