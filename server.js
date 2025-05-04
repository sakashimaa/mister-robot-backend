const express = require('express');
const sequelize = require('./config/database');
const cors = require('cors');
const { YooCheckout } = require('@a2seven/yoo-checkout');
require('dotenv').config();

const computerRoutes = require('./routes/computerRoutes');
const headphonesRoutes = require('./routes/headphonesRoutes');
const monitorRoutes = require('./routes/monitorRoutes');
const mouseRoutes = require('./routes/mouseRoutes');
const imageRoutes = require('./routes/imageRoutes');
const newsRoutes = require('./routes/newsRoutes');
const keyboardRoutes = require('./routes/keyboardRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/computers', computerRoutes);
app.use('/api/headphones', headphonesRoutes);
app.use('/api/monitors', monitorRoutes);
app.use('/api/mouses', mouseRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/keyboards', keyboardRoutes);
app.use('/api', userRoutes);

const yooKassa = new YooCheckout({
    shopId: '1071433',
    secretKey: 'test_roh2EJOT_-doie06ZEJbgm3tuaA0hFI_X3J75Nd9iPY'
});

app.post('/create-payment/:amount', async (req, res) => {
    const { amount } = req.params;
    try {
        const payment = await yooKassa.createPayment({
            amount: {
                value: amount,
                currency: 'RUB'
            },
            payment_method_data: {
                type: 'bank_card'
            },
            confirmation: {
                type: 'redirect',
                return_url: 'http://127.0.0.1:5500/%D0%BC%D0%B8%D1%81%D1%82%D0%B5%D1%80%20%D1%80%D0%BE%D0%B1%D0%BE%D1%822/index.html'
            },
            description: 'Заказ №1'
        });

        res.json({paymentUrl: payment.confirmation.confirmation_url});
    } catch (err) {
        console.log(`error creating payment: ${err}`);
        res.status(500).json({error: 'server error', message: err.message});
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connected to postgreSQL');
        return sequelize.sync({force: false});
    })
    .then(() => {
        console.log('Models synchronized with DB');
    })
    .catch((err) => {
        console.log(`Error connecting to postgreSQL: ${err}`);
    });

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});