const officeController = require('../controllers/office.controller');

const router = require('express').Router();

router.post('/add', officeController.addOffice);
router.get('/', officeController.getOffice);

module.exports = router;