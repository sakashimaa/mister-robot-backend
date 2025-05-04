const redis = require('redis');

const client = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

client.on('error', (err) => {
    console.log(`Redis client error: ${err}`);
});

(async () => {
    await client.connect();
})();

module.exports = client;