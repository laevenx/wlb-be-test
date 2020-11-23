const jwt = require('jsonwebtoken');
// const SECRET = process.env.SECRET_CODE;
const SECRET = '1001'

function generateToken(data) {
    return jwt.sign(data,SECRET)
};

function verifyToken(data) {
    return jwt.verify(data,SECRET)
};

module.exports = {
    generateToken,
    verifyToken
};