const jwtProvider = require("../jwt/JWTProvider");
const authorisationFilter = {
    requireAuthentication(req, res, next) {
        if (req.get('Authorization')) {
            try {
                jwtProvider.checkJWT(req.get('Authorization').substr("Bearer ".length));
                next();
            }
            catch (e) {
                console.log(e);
                res.status(401).end();
            }
        } else {
            res.status(401).end();
        }
    }
};

module.exports = authorisationFilter;