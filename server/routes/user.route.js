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

router.route('/delete/:id')
    .delete(userController.deleteUser)

module.exports = router;