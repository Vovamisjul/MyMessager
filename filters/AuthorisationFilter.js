const checkJWT = require("../jwt/JWTProvider").checkJWT;
const authorisationFilter = {
    requireAuthentication(req, res, next) {
        if (req.get('Authorization')) {
            try {
                checkJWT(req.get('Authorization').substr("Bearer ".length));
                next();
            }
            catch (e) {
                res.status(401).end();
            }
        } else {
            res.status(401).end();
        }
    }
};

module.exports = authorisationFilter;