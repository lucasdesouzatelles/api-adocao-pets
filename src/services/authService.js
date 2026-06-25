const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'chaveSecreta123';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

const createError = (message, statusCode = 400) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

const sanitizeUser = (user) => {
    const safeUser = { ...user };
    delete safeUser.password;

    return safeUser;
};

const login = async ({ email, password } = {}) => {
    if (!email || !password) {
        throw createError('Email e senha sao obrigatorios.', 400);
    }

    const user = await userModel.findByEmail(email);

    if (!user) {
        throw createError('Credenciais invalidas.', 401);
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
        throw createError('Credenciais invalidas.', 401);
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    });

    return {
        token,
        user: sanitizeUser(user)
    };
};

module.exports = {
    login
};
