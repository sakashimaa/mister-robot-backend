const Computer = require('../models/Computer');
const redisClient = require('../config/redis');

exports.getAllComputers = async(req, res) => {
    try {
        // const cachedData = await redisClient.get('computers');
        // if (cachedData) {
        //     return res.json(JSON.parse(cachedData));
        // }

        const computers = await Computer.findAll();
        const total = await Computer.count();

        await redisClient.setEx('computers', 3600, JSON.stringify({computers, total}));
        res.json(computers);
    } catch (err) {
        res.status(500).json({error: "server error", message: err.message});
    }
};

exports.createNewComputer = async(req, res) => {
    try {
        const computer = await Computer.create(req.body);
        res.json(computer);
    } catch (err) {
        res.status(400).json({error: 'bad request', message: err.message});
    }
};