const petService = require('../services/petService');
const asyncHandler = require('../middlewares/asyncHandler');

const listPets = asyncHandler(async (req, res) => {
    const pets = await petService.listPets();

    res.json(pets);
});

const listAvailablePets = asyncHandler(async (req, res) => {
    const pets = await petService.listAvailablePets();

    res.json(pets);
});

const getPetById = asyncHandler(async (req, res) => {
    const pet = await petService.getPetById(req.params.id);

    res.json(pet);
});

const createPet = asyncHandler(async (req, res) => {
    const pet = await petService.createPet(req.body);

    res.status(201).json(pet);
});

const updatePet = asyncHandler(async (req, res) => {
    const pet = await petService.updatePet(req.params.id, req.body);

    res.json(pet);
});

const deletePet = asyncHandler(async (req, res) => {
    await petService.deletePet(req.params.id);

    res.status(204).send();
});

module.exports = {
    listPets,
    listAvailablePets,
    getPetById,
    createPet,
    updatePet,
    deletePet
};
