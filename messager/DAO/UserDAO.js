class UserDAO {
    bd = require("./bdDAO");

    async checkUser(user) {
        let result = await this.bd.perform("select 1 from users where login = ? and password = ?", user.username, user.password);
        return Boolean(result[0]);
    }

    async registerUser(user) {
        return await this.bd.perform("insert into users value (?, ?, ?)", user.username, user.password, user.password);
    }
}
let userDAO = new UserDAO();
module.exports = userDAO;