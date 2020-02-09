class UserDAO {
    bd = require("./bdDAO");
    async checkUser(user) {
        let result = await this.bd.perform("select 1 from users where login = ? and password = ?", user.login, user.password);
        return Boolean(result[0]);
    }
}
let userDAO = new UserDAO();
module.exports = userDAO;