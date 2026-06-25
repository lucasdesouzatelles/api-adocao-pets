const adoptionService = require('../services/adoptionService');
const asyncHandler = require('../middlewares/asyncHandler');

const listAdoptions = asyncHandler(async (req, res) => {
    const adoptions = await adoptionService.listAdoptions();

    res.json(adoptions);
});

const createAdoption = asyncHandler(async (req, res) => {
    const adoption = await adoptionService.createAdoption(req.body, req.user);

    res.status(201).json(adoption);
});

module.exports = {
    listAdoptions,
    createAdoption
};
