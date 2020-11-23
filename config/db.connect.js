const mongoose = require('mongoose');

// const mongoUri = process.env.MONGO_URI
const mongoUri = "mongodb://localhost:27017/test-social"

function dbConnect() {
    mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('We connected to mongoose')
    });
}

module.exports = dbConnect;