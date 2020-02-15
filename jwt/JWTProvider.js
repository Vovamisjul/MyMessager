const fs = require('fs');
const jwt = require('jsonwebtoken');

class JWTProvider {
    constructor() {
        try {
            this.refreshTokens = new Set(JSON.parse(fs.readFileSync("jwt/storage/refreshTokens.json").toString()));
        } catch (e) {
            this.refreshTokens = new Set();
        }
        this.privateKEY = fs.readFileSync('jwt/keys/private.key', 'utf8');
        this.publicKEY = fs.readFileSync('jwt/keys/public.key', 'utf8');
        setInterval(() => {
            for (let refreshToken of this.refreshTokens) {
                try {
                    jwt.verify(refreshToken, this.publicKEY, {expiresIn: 900000, algorithm: ["RS256"]});
                } catch (e) {
                    this.refreshTokens.delete(refreshToken);
                }
            }
            fs.writeFile("jwt/storage/refreshTokens.json", JSON.stringify([...this.refreshTokens]), (e) => {
                console.log(e)
            });
        }, 60 * 1000);
    }

    createJWT(payload) {
        let token = jwt.sign(payload, this.privateKEY, {expiresIn: 300, algorithm: "RS256"});
        let refreshToken = jwt.sign(payload, this.privateKEY, {expiresIn: 900000, algorithm: "RS256"});
        this.refreshTokens.add(refreshToken);
        fs.writeFile("jwt/storage/refreshTokens.json", JSON.stringify([...this.refreshTokens]), (e) => {
            console.log(e)
        });
        return {token, refreshToken};
    }

    refreshToken(oldRefreshToken) {
        if (this.refreshTokens.has(oldRefreshToken)) {
            let username = jwt.verify(oldRefreshToken, this.publicKEY, {expiresIn: 900000, algorithm: ["RS256"]}).username;
            let token = jwt.sign({username}, this.privateKEY, {expiresIn: 300, algorithm: "RS256"});
            let refreshToken = jwt.sign({username}, this.privateKEY, {expiresIn: 900000, algorithm: "RS256"});
            this.refreshTokens.delete(oldRefreshToken);
            this.refreshTokens.add(refreshToken);
            fs.writeFile("jwt/storage/refreshTokens.json", JSON.stringify([...this.refreshTokens]), (e) => {
                console.log(e)
            });
            return {token, refreshToken};
        }
        throw new Error("No such refreshToken");
    }

    checkJWT(token) {
        return jwt.verify(token, this.publicKEY, {expiresIn: 300, algorithm: ["RS256"]});
    }
}

module.exports = new JWTProvider();