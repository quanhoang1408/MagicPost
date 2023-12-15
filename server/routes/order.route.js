const orderController = require('../controllers/order.controller');
const verifyToken = require('../middlewares/verifyToken');
const authorize = require('../middlewares/authorize');
const constants = require("../utils/constants");
const router = require('express').Router();

router.route('/')
    .get(verifyToken, orderController.getOrders)

router.route('/create')
    .post(verifyToken, authorize([constants.ROLES.OFFICE_STAFF]), orderController.create)

router.route('/forwardToStation')
    .post(verifyToken, authorize([constants.ROLES.OFFICE_STAFF, constants.ROLES.STATION_STAFF]), orderController.forwardToStation)

router.route('/forwardToOffice')
    .post(verifyToken, authorize([constants.ROLES.OFFICE_STAFF]), orderController.forwardToOffice)

router.route('/confirmArrival')
    .post(verifyToken, authorize([constants.ROLES.OFFICE_STAFF, constants.ROLES.STATION_STAFF]), orderController.confirmArrival)

router.route('/delivers')
    .get(verifyToken, authorize([constants.ROLES.OFFICE_STAFF]), orderController.getDelivers)
    .post(verifyToken, authorize([constants.ROLES.OFFICE_STAFF]), orderController.createDeliver)

module.exports = router;