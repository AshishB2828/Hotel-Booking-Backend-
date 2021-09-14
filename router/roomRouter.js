const roomController = require('../controllers/roomController')
const router = require('express').Router()

router.get("/", roomController.getallRooms )
router.post("/add", roomController.createRooms )

module.exports = router