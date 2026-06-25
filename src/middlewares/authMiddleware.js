const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'chaveSecreta123';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (!decoded.userId || !decoded.role) {
            return res.status(403).json({ message: 'Token inválido ou expirado.' });
        }

        req.user = {
            id: decoded.userId,
            role: decoded.role
        };

        next();
    } catch {
        return res.status(403).json({ message: 'Token inválido ou expirado.' });
    }
};

const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res
            .status(403)
            .json({ message: 'Acesso negado. Recurso exclusivo para administradores.' });
    }

    next();
};

const isAdopter = (req, res, next) => {
    if (!req.user || req.user.role !== 'adopter') {
        return res
            .status(403)
            .json({ message: 'Acesso negado. Recurso exclusivo para adotantes.' });
    }

    next();
};

module.exports = {
    verifyToken,
    isAdmin,
    isAdopter
};
