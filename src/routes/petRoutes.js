const express = require('express');

const petController = require('../controllers/petController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/available', petController.listAvailablePets);

router.use(verifyToken, isAdmin);

router.get('/', petController.listPets);
router.get('/:id', petController.getPetById);
router.post('/', petController.createPet);
router.put('/:id', petController.updatePet);
router.delete('/:id', petController.deletePet);

module.exports = router;
