const roomController = require('../controllers/roomController')
const router = require('express').Router()

router.get("/", roomController.getallRooms )
router.get("/:id", roomController.getRoomById )
router.post("/add", roomController.createRooms )

module.exports = router