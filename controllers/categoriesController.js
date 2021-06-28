const categoriesService = require('../services/categories');

const create = async (req, res) => {
    const { authorization } = req.headers;
    const result = await categoriesService.create(req.body);

    if (result.message) return res.status(400).json(result);    
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    if (authorization.length < 15) {
        return res.status(401).json({ message: 'Expired or invalid token' }); 
    }
    return res.status(201).json(result);
};

module.exports = {
    create,
};