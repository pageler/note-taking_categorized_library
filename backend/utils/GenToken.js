// JWT certifies the user identity and sends it to the client:
jwt = require("jsonwebtoken");
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

module.exports = generateToken;
