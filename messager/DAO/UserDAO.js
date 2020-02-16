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

    async getFriends(username) {
        return await this.bd.perform("select friend_username as username from user_friends where username = ? and accepted = 1", username);
    }

    async getUsers(searchUsername, username) {
        return await this.bd.perform("select username from users where username not in (select friend_username from user_friends where username = ?) and username like ? and username != ? limit 10", username, `%${searchUsername}%`, username);
    }

    async friendRequest(username, friendUsername) {
        await this.bd.perform("insert into user_friends values (?, ?, 0), (?, ?, 0)", username, friendUsername, friendUsername, username);
    }
}

let userDAO = new UserDAO();
module.exports = userDAO;