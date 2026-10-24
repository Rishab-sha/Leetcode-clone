const { createClient }  = require('redis');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'artisanal-ochreish-sea-43926.db.redis.io',
        port:  13712 
    }
});

module.exports = redisClient;