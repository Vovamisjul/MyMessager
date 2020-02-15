class UserDAO {
    bd = require("./bdDAO");

    async checkUser(username, password) {
        let result = await this.bd.perform("select 1 from users where username = ? and password = ?", username,     password);
        return Boolean(result[0]);
    }

    async registerUser(username, password) {
        return await this.bd.perform("insert into users value (?, ?, null)", username, password);
    }

    async sendMessage(username, conversationId, text, fileName) {
        let result = await this.bd.perform("insert into messages value (null, ?, null, ?, ?, ?, now())", text, fileName, username, conversationId);
        let insertedMessage = await this.bd.perform("select text, id, sender_username, file_name, date from messages where id = ?", result.insertId);
        return insertedMessage[0];
    }
}

let userDAO = new UserDAO();
module.exports = userDAO;