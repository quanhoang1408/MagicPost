const stationController = require('../controllers/station.controller');
const verifyToken = require('../middlewares/verifyToken');
const authorize = require('../middlewares/authorize');
const constants = require("../utils/constants");

const router = require('express').Router();

router.post('/add',verifyToken, authorize([constants.ROLES.BOSS]), stationController.addStation);
router.get('/', stationController.getStation);
router.put('/update/:id', stationController.updateStation);
router.delete('/delete/:id', stationController.deleteStation);

module.exports = router;