const officeController = require('../controllers/office.controller');

const router = require('express').Router();

router.post('/add', officeController.addOffice);
router.get('/', officeController.getOffice);
router.delete('/delete/:id', officeController.deleteOffice);

module.exports = router;