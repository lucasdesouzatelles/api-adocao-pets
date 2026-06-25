const authService = require('../services/authService');
const asyncHandler = require('../middlewares/asyncHandler');

const login = asyncHandler(async (req, res) => {
    const authData = await authService.login(req.body);

    res.json(authData);
});

module.exports = {
    login
};
