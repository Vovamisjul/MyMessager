const fs = require('fs');
const jwt = require('jsonwebtoken');
const randToken = require('rand-token');

var privateKEY = fs.readFileSync('jwt/keys/private.key', 'utf8');
var publicKEY = fs.readFileSync('jwt/keys/public.key', 'utf8');

var jwtProvider = {
    refreshTokens: {},
    createJWT(payload) {
        let token = jwt.sign(payload, privateKEY, {expiresIn: 300, algorithm: "RS256"});
        let refreshToken = jwt.sign(payload, privateKEY, {expiresIn: 900000, algorithm: "RS256"});
        let result = {
            token: token,
            refreshToken: refreshToken
        };
        this.refreshTokens[refreshToken] = result;
        return result;
    },
    refreshToken(refreshToken) {
        console.log(this.refreshTokens);
        if (refreshToken in this.refreshTokens) {
            let username = jwt.verify(refreshToken, publicKEY, {expiresIn: 900000, algorithm:  ["RS256"]});
            let newToken = jwt.sign({username}, privateKEY, { expiresIn: 900000});
            this.refreshTokens[refreshToken].token = newToken;
            return newToken;
        }
        throw new Error("No such refreshToken");
    },
    checkJWT(token) {
        return jwt.verify(token, publicKEY, {expiresIn: 300, algorithm:  ["RS256"]});
    }
};

module.exports = jwtProvider;