const Headphones = require('../models/Headphones');

exports.getAllHeadphones = async(req, res) => {
    try {
        const headphones = await Headphones.findAll();
        res.json(headphones);
    } catch (err) {
        res.status(500).json({error: 'Server error', message: err.message});
    }
};

exports.createNewHeadphones = async(req, res) => {
    try {
        const headphones = await Headphones.create(req.body);
        res.json(headphones);
    } catch (err) {
        res.status(400).json({error: 'bad request', message: err.message});
    }
};