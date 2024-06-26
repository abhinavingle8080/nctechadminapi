const { to, ReE } = require('../services/util.service');
const CONFIG = require('../config/config.json');
const constants = require('../config/constants');

let validateSecretKey = async function (req, res, next) {
    const providedSecretKey = req.headers['x-secret-key'];
    if (providedSecretKey === CONFIG.app_secret_key) {
        next();
    } else {
        return ReE(res, { statusCode : constants.STATUS_CODES.UNAUTHORIZED, static_key: 'UNAUTHORIZED_USER', message: "Unauthorized user." }, constants.STATUS_CODES.UNAUTHORIZED);
    }
}

module.exports.validateSecretKey = validateSecretKey;