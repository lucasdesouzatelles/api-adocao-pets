const express = require('express');

const adoptionController = require('../controllers/adoptionController');
const { verifyToken, isAdmin, isAdopter } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(verifyToken);

router.get('/', isAdmin, adoptionController.listAdoptions);
router.post('/', isAdopter, adoptionController.createAdoption);

module.exports = router;
