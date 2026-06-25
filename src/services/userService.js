const bcrypt = require('bcrypt');

const userModel = require('../models/userModel');

const VALID_ROLES = ['admin', 'adopter'];

const createError = (message, statusCode = 400) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

const hasText = (value) => typeof value === 'string' && value.trim().length > 0;

const sanitizeUser = (user) => {
    if (!user) {
        return null;
    }

    const safeUser = { ...user };
    delete safeUser.password;

    return safeUser;
};

const assertCanAccessUser = (id, requester) => {
    if (requester.role === 'admin' || Number(requester.id) === Number(id)) {
        return;
    }

    throw createError('Acesso negado para este usuario.', 403);
};

const assertValidRole = (role) => {
    if (!VALID_ROLES.includes(role)) {
        throw createError('Role deve ser admin ou adopter.', 400);
    }
};

const listUsers = async () => userModel.findAll();

const getUserById = async (id, requester) => {
    assertCanAccessUser(id, requester);

    const user = await userModel.findById(id);

    if (!user) {
        throw createError('Usuario nao encontrado.', 404);
    }

    return sanitizeUser(user);
};

const createUser = async ({ name, email, password, phone, role = 'adopter' } = {}) => {
    if (!hasText(name) || !hasText(email) || !hasText(password) || !hasText(phone)) {
        throw createError('Nome, email, senha e telefone sao obrigatorios.', 400);
    }

    assertValidRole(role);

    const emailInUse = await userModel.findByEmail(email.trim());

    if (emailInUse) {
        throw createError('Email ja cadastrado.', 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        name: name.trim(),
        email: email.trim(),
        password: hashedPassword,
        phone: phone.trim(),
        role
    });

    return sanitizeUser(user);
};

const updateUser = async (id, data = {}, requester) => {
    const currentUser = await userModel.findById(id);

    if (!currentUser) {
        throw createError('Usuario nao encontrado.', 404);
    }

    assertCanAccessUser(id, requester);

    const updates = {};

    if (data.name !== undefined) {
        if (!hasText(data.name)) {
            throw createError('Nome invalido.', 400);
        }

        updates.name = data.name.trim();
    }

    if (data.email !== undefined) {
        if (!hasText(data.email)) {
            throw createError('Email invalido.', 400);
        }

        const email = data.email.trim();
        const emailInUse = await userModel.findByEmail(email);

        if (emailInUse && Number(emailInUse.id) !== Number(id)) {
            throw createError('Email ja cadastrado.', 409);
        }

        updates.email = email;
    }

    if (data.password !== undefined) {
        if (!hasText(data.password)) {
            throw createError('Senha invalida.', 400);
        }

        updates.password = await bcrypt.hash(data.password, 10);
    }

    if (data.phone !== undefined) {
        if (!hasText(data.phone)) {
            throw createError('Telefone invalido.', 400);
        }

        updates.phone = data.phone.trim();
    }

    if (data.role !== undefined) {
        assertValidRole(data.role);

        if (requester.role !== 'admin' && data.role !== currentUser.role) {
            throw createError('Apenas admin pode alterar o role.', 403);
        }

        updates.role = data.role;
    }

    const user = await userModel.update(id, updates);

    return sanitizeUser(user);
};

const deleteUser = async (id) => {
    const user = await userModel.findById(id);

    if (!user) {
        throw createError('Usuario nao encontrado.', 404);
    }

    await userModel.remove(id);
};

module.exports = {
    listUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
