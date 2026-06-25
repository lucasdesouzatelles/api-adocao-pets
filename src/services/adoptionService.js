const adoptionModel = require('../models/adoptionModel');
const petModel = require('../models/petModel');
const userModel = require('../models/userModel');

const createError = (message, statusCode = 400) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

const normalizeId = (id, fieldName) => {
    const normalizedId = Number(id);

    if (!Number.isInteger(normalizedId) || normalizedId <= 0) {
        throw createError(`${fieldName} invalido.`, 400);
    }

    return normalizedId;
};

const listAdoptions = async () => adoptionModel.findAll();

const createAdoption = async (data = {}, requester) => {
    const userId = normalizeId(requester.id, 'Usuario');
    const petId = normalizeId(data.pet_id || data.petId, 'Pet');

    const user = await userModel.findById(userId);

    if (!user) {
        throw createError('Usuario nao encontrado.', 404);
    }

    if (user.role !== 'adopter') {
        throw createError('Apenas usuarios adopter podem adotar pets.', 403);
    }

    const pet = await petModel.findById(petId);

    if (!pet) {
        throw createError('Pet nao encontrado.', 404);
    }

    if (pet.status !== 'available') {
        throw createError('Pet nao esta disponivel para adocao.', 400);
    }

    const existingAdoption = await adoptionModel.findByUserAndPet(userId, petId);

    if (existingAdoption) {
        throw createError('Usuario ja adotou este pet.', 409);
    }

    return adoptionModel.create({ userId, petId });
};

module.exports = {
    listAdoptions,
    createAdoption
};
