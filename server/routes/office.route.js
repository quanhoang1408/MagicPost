const officeController = require('../controllers/office.controller');

const router = require('express').Router();

router.post('/add', officeController.addOffice);
router.get('/', officeController.getOffice);
router.delete('/delete/:id', officeController.deleteOffice);
router.put('/update/:id', officeController.updateOffice);

module.exports = router;