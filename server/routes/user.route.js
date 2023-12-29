const userController = require('../controllers/user.controller');

const router = require('express').Router();

router.route('/add')
    .post(userController.addUser)

router.route('/id')
    .get(userController.getUserInfoById)

router.route('/update/:id')
    .put(userController.updateUser)

router.route('/')
    .get(userController.getAllUsers)

router.route('/station-leads')
    .get(userController.getAllStationLeads)

router.route('/office-staffs')
    .get(userController.getAllStaffAtOffice)

router.route('/station-staffs')
    .get(userController.getAllStaffAtStation)

router.route('/office-leads')
    .get(userController.getAllOfficeLeads)

router.route('/delete/:id')
    .delete(userController.deleteUser)

router.route('/change-password/:id')
    .put(userController.changePassword)

module.exports = router;