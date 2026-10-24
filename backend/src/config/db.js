const dns = require('node:dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');

async function main() {
    await mongoose.connect(process.env.DB_CONNECT_STRING);
    console.log('MongoDB connected successfully');
}
module.exports = main;



