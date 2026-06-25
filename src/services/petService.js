const petModel = require('../models/petModel');

const VALID_STATUS = ['available', 'adopted'];

const createError = (message, statusCode = 400) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

const hasText = (value) => typeof value === 'string' && value.trim().length > 0;

const normalizeAge = (age) => {
    const normalizedAge = Number(age);

    if (!Number.isInteger(normalizedAge) || normalizedAge < 0) {
        throw createError('Idade do pet deve ser um numero inteiro maior ou igual a zero.', 400);
    }

    return normalizedAge;
};

const normalizeDescription = (description) => {
    if (description === undefined || description === null) {
        return null;
    }

    if (typeof description !== 'string') {
        throw createError('Descricao deve ser texto.', 400);
    }

    return description.trim() || null;
};

const listPets = async () => petModel.findAll();

const listAvailablePets = async () => petModel.findAvailable();

const getPetById = async (id) => {
    const pet = await petModel.findById(id);

    if (!pet) {
        throw createError('Pet nao encontrado.', 404);
    }

    return pet;
};

const createPet = async ({ name, age, species, size, description } = {}) => {
    if (!hasText(name) || !hasText(species) || !hasText(size) || age === undefined) {
        throw createError('Nome, idade, especie e porte sao obrigatorios.', 400);
    }

    return petModel.create({
        name: name.trim(),
        age: normalizeAge(age),
        species: species.trim(),
        size: size.trim(),
        status: 'available',
        description: normalizeDescription(description)
    });
};

const updatePet = async (id, data = {}) => {
    const currentPet = await petModel.findById(id);

    if (!currentPet) {
        throw createError('Pet nao encontrado.', 404);
    }

    const updates = {};

    if (data.name !== undefined) {
        if (!hasText(data.name)) {
            throw createError('Nome invalido.', 400);
        }

        updates.name = data.name.trim();
    }

    if (data.age !== undefined) {
        updates.age = normalizeAge(data.age);
    }

    if (data.species !== undefined) {
        if (!hasText(data.species)) {
            throw createError('Especie invalida.', 400);
        }

        updates.species = data.species.trim();
    }

    if (data.size !== undefined) {
        if (!hasText(data.size)) {
            throw createError('Porte invalido.', 400);
        }

        updates.size = data.size.trim();
    }

    if (data.status !== undefined) {
        if (!VALID_STATUS.includes(data.status)) {
            throw createError('Status deve ser available ou adopted.', 400);
        }

        updates.status = data.status;
    }

    if (data.description !== undefined) {
        updates.description = normalizeDescription(data.description);
    }

    return petModel.update(id, updates);
};

const deletePet = async (id) => {
    const pet = await petModel.findById(id);

    if (!pet) {
        throw createError('Pet nao encontrado.', 404);
    }

    if (pet.status !== 'available') {
        throw createError('Somente pets disponiveis podem ser removidos.', 400);
    }

    await petModel.remove(id);
};

module.exports = {
    listPets,
    listAvailablePets,
    getPetById,
    createPet,
    updatePet,
    deletePet
};
