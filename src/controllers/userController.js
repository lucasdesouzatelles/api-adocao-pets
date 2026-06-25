const userService = require('../services/userService');
const asyncHandler = require('../middlewares/asyncHandler');

const listUsers = asyncHandler(async (req, res) => {
    const users = await userService.listUsers();

    res.json(users);
});

const getUserById = asyncHandler(async (req, res) => {
    const user = await userService.getUserById(req.params.id, req.user);

    res.json(user);
});

const createUser = asyncHandler(async (req, res) => {
    const user = await userService.createUser(req.body);

    res.status(201).json(user);
});

const updateUser = asyncHandler(async (req, res) => {
    const user = await userService.updateUser(req.params.id, req.body, req.user);

    res.json(user);
});

const deleteUser = asyncHandler(async (req, res) => {
    await userService.deleteUser(req.params.id);

    res.status(204).send();
});

module.exports = {
    listUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
