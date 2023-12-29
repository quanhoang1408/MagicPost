const orderController = require('../controllers/order.controller');
const verifyToken = require('../middlewares/verifyToken');
const authorize = require('../middlewares/authorize');
const constants = require("../utils/constants");
const router = require('express').Router();

router.route('/')
    .get(verifyToken, orderController.getOrders)

router.route('/stats')
    .get(verifyToken, authorize([constants.ROLES.BOSS, constants.ROLES.OFFICE_LEAD, constants.ROLES.STATION_LEAD]), orderController.stats)

router.route('/get')
    .get(verifyToken, orderController.getAllOrders)

router.route('/get/created')
    .get(verifyToken, orderController.getOrdersCreated)

router.route('/create')
    .post(verifyToken, authorize([constants.ROLES.OFFICE_STAFF]), orderController.create)

router.route('/forward/:id')
    .put(verifyToken, authorize([constants.ROLES.STATION_STAFF]), orderController.forward)

router.route('/confirmArrival/:id')
    .put(verifyToken, authorize([constants.ROLES.OFFICE_STAFF, constants.ROLES.STATION_STAFF]), orderController.confirmArrival)

router.route('/delivers/:id')
    .put(verifyToken, authorize([constants.ROLES.OFFICE_STAFF]), orderController.createDeliver)

router.route('/logs/:code')
    .get(orderController.getOrderLogsByCode)

router.route('/update/:id')
    .put(verifyToken, authorize([constants.ROLES.OFFICE_STAFF]), orderController.updateOrder)

module.exports = router;