const fs   = require('fs');
const jwt  = require('jsonwebtoken');

var privateKEY  = fs.readFileSync('jwt/keys/private.key', 'utf8');
var publicKEY  = fs.readFileSync('jwt/keys/public.key', 'utf8');

var jwtProvider = {
    createJWT(payload) {
        let i  = 'Mysoft corp';          // Issuer
        let s  = 'some@user.com';        // Subject
        let a  = 'http://mysoftcorp.in'; // Audience
// SIGNING OPTIONS
        let signOptions = {
            issuer:  i,
            subject:  s,
            audience:  a,
            expiresIn:  "12h",
            algorithm:  "RS256"
        };
        return jwt.sign(payload, privateKEY, signOptions);
    },
    checkJWT(token) {
        let i  = 'Mysoft corp';          // Issuer
        let s  = 'some@user.com';        // Subject
        let a  = 'http://mysoftcorp.in'; // Audience
        let verifyOptions = {
            issuer: i,
            subject: s,
            audience: a,
            expiresIn: "12h",
            algorithm: ["RS256"]
        };
        return jwt.verify(token, publicKEY, verifyOptions);
    }
};

module.exports = jwtProvider;