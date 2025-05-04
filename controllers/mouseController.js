const Mouse = require('../models/Mouse');

exports.getAllMouses = async(req, res) => {
    try {
        const mouses = await Mouse.findAll();
        res.json(mouses);
    } catch (err) {
        res.status(500).json({error: 'server error', message: err.message});
    }
};

exports.createNewMouse = async(req, res) => {
    try {
        const mouse = await Mouse.create(req.body);
        res.json(mouse);
    } catch (err) {
        res.status(400).json({error: 'bad request', message: err.message});
    }
};