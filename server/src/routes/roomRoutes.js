const router = require("express").Router();
const controller = require("../controllers/roomController");

router.get("/", controller.getRooms);
router.post("/", controller.createRoom);

module.exports = router;