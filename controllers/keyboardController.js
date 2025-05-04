const Keyboard = require('../models/Keyboard');

exports.getAllKeyboards = async (req, res) => {
    try {
        const keyboards = await Keyboard.findAll();
        res.json(keyboards);
    } catch (err) {
        res.status(500).json({error: 'server error', message: err.message});
    }
};

exports.createNewKeyboard = async (req, res) => {
    try {
        const keyboard = await Keyboard.create(req.body);
        res.json(keyboard);
    } catch (err) {
        res.status(400).json({error: 'bad request', message: err.message});
    }
};