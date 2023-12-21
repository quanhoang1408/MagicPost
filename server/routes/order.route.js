const orderController = require('../controllers/order.controller');
const verifyToken = require('../middlewares/verifyToken');
const authorize = require('../middlewares/authorize');
const constants = require("../utils/constants");
const router = require('express').Router();

router.route('/')
    .get(verifyToken, orderController.getOrders)

router.route('/create')
    .post(verifyToken, authorize([constants.ROLES.OFFICE_STAFF]), orderController.create)

router.route('forward/:id')
    .put(verifyToken, authorize([constants.ROLES.STATION_STAFF]), orderController.forward)

router.route('/confirmArrival/:id')
    .put(verifyToken, authorize([constants.ROLES.OFFICE_STAFF, constants.ROLES.STATION_STAFF]), orderController.confirmArrival)

router.route('/delivers')
    .put(verifyToken, authorize([constants.ROLES.OFFICE_STAFF]), orderController.createDeliver)

module.exports = router;