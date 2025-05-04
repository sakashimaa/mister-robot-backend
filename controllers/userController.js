const bcrypt = require('bcrypt');
const User = require('../models/User');
const Order = require('../models/Order');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const yandexS3Client = require('../config/yandexS3');

exports.registerUser = async (req, res) => {
    console.log('registering user');
    try {
        const { email, password, firstName, lastName, phone, avatarUrl } = req.body;
        if (!email || !password) {
            return res.status(400).json({message: 'Имя пользователя и пароль обязательны'});
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({message: 'Пользователь с таким email уже существует'});
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            phone,
            avatarUrl
        });

        return res.status(201).json({message: 'user registered sucessfully'});
    } catch (err) {
        console.log(`error registering user: ${err}`);
        return res.status(500).json({error: 'server error', message: err.message});
    }
};

exports.loginUser = async (req, res) => {
    console.log('here');
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({error: 'email and password are required'});
        }
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({error: 'email or password are incorrect'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(404).json({error: 'email or password are incorrect'});
        }

        return res.status(200).json({message: 'Logged in sucessfully', userId: user.id});
    } catch (err) {
        console.log(`error logging user: ${err}`);
        res.status(500).json({error: 'server error', message: err.message});
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        console.log(`error getting users: ${err}`);
        res.status(500).json({error: 'server error', message: err.message});
    }
};

exports.createNewUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.status(200).json(user);
    } catch (err) {
        console.log(`error: ${err}`);
        return res.status(500).json({error: 'server error'});
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        console.log(req.params);
        const { userId } = req.params;
        const user = await User.findByPk(userId, {
            attributes: ['id', 'email', 'firstName', 'lastName', 'phone', 'avatarUrl']
        });

        if (!user) {
            return res.status(404).json({error: 'user not found'});
        }

        return res.status(200).json(user);
    } catch (err) {
        console.log(`error: ${err}`);
        res.status(500).json({error: 'server error', message: err.message});
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.findAll({where:{userId}});
        console.log(userId);
        console.log(orders);

        return res.status(200).json(orders);
    } catch (err) {
        console.log(`error: ${err}`);
        req.status(500).json({error: 'server error', message: err.message});
    }
};

exports.createOrder = async (req, res) => {
    try {
        const { userId, totalAmount, items, status } = req.body;
        console.log(userId, totalAmount, items, status);

        if (!userId || !totalAmount || !items) {
            return res.status(400).json({message: 'userId, totalAmount, items is required.'});
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({error: 'user not found'});
        }

        const orderNumber = `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`;
        const order = await Order.create({
           orderNumber,
           totalAmount,
           status: status || 'pending',
            items,
            userId
        });

        return res.status(200).json({message: 'Order created sucessfully', order});
    } catch (err) {
        console.log(`error: ${err}`);
        return res.status(500).json({error: 'server error', message: err.message});
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findByPk(orderId);

        if (!order) {
            return res.status(400).json({error: `order with id ${orderId} not found`});
        }

        await order.destroy();
        return res.status(200).json({message: `deleted order`});
    } catch (err) {
        console.log(`error: ${err}`);
        return res.status(500).json({error: 'server error', message: err.message});
    }
};

exports.uploadAvatar = async (req, res) => {
    try {
        const userId = req.body.userId;
        const file = req.file;

        if (!userId || !file) {
            return req.status(400).json({error: 'userId and file are required'});
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({error: `can\`t find user with id ${userId}`});
        }

        const fileName = `user_${userId}_avatar_${Date.now()}.${file.originalname.split('.').pop()}`;
        const params = {
            Bucket: process.env.YANDEX_BUCKET,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimeType,
            ACL: 'public-read',
        };

        const command = new PutObjectCommand(params);
        await yandexS3Client.send(command);

        user.avatarUrl = fileName;
        await user.save();

        const imageURL = `https://${process.env.YANDEX_BUCKET}.storage.yandexcloud.net/${fileName}`;
        return res.status(200).json({message: 'avatar uploaded sucessfully', imageURL});
    } catch (err) {
        console.log(`error: ${err}`);
        return res.status(500).json({error: 'server error', message: err.message});
    }
};