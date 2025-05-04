const Monitor = require('../models/Monitor');

exports.getAllMonitors = async(req, res) => {
    try {
        const monitors = await Monitor.findAll();
        res.json(monitors);
    } catch (err) {
        res.status(500).json({error: 'server error', message: err.message});
    }
};

exports.createNewMonitor = async(req, res) => {
    try {
        const monitor = await Monitor.create(req.body);
        res.json(monitor);
    } catch (err) {
        res.status(400).json({error: 'bad request', message: err.message});
    }
};