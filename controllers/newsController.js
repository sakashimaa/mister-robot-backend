const New = require('../models/New');

exports.getAllNews = async(req, res) => {
    try {
        const news = await New.findAll();
        res.json(news);
    } catch (err) {
        req.status(500).json({error: 'server error', message: err.message});
    }
};

exports.createNew = async(req, res) => {
    try {
        const newNew = await New.create(req.body);
        res.json(newNew);
    } catch (err) {
        req.status(400).json({error: 'bad request', message: err.message});
    }
};