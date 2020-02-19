const sha512 = require('js-sha512');

class UserDAO {
    bd = require("./bdDAO");

    async checkUser(username, password) {
        let result = await this.bd.perform("select 1 from users where username = ? and password = ?", username, sha512(password));
        return Boolean(result[0]);
    }

    async registerUser(username, password) {
        return await this.bd.perform("insert into users value (?, ?, null)", username, sha512(password));
    }

    async sendMessage(username, conversationId, text) {
        let result = await this.bd.perform("insert into messages value (null, ?, ?, ?, now(), null)", text, username, conversationId);
        return {
            id: result.insertId,
            text: text,
            sender_username: username,
            date: new Date()
        };
    }

    async getFriends(username) {
        return await this.bd.perform("select friend_username as username from user_friends where username = ? and accepted = 1", username);
    }

    async getUsers(searchUsername, username) {
        return await this.bd.perform("select username from users where username not in (select friend_username from user_friends where username = ?) and username like ? and username != ? limit 10", username, `%${searchUsername}%`, username);
    }

    async sendFriendRequest(username, friendUsername) {
        await this.bd.perform("insert into user_friends values (?, ?, 0), (?, ?, 0)", username, friendUsername, friendUsername, username);
    }

    async getFriendRequests(username) {
        return await this.bd.perform("select friend_username as username from user_friends where username = ? and accepted = 0", username);
    }

    async acceptFriend(username, friendUsername) {
        await this.bd.perform("update user_friends set accepted = 1 where username = ? and friend_username = ? or username = ? and friend_username = ?", username, friendUsername, friendUsername, username)
    }
}

let userDAO = new UserDAO();
module.exports = userDAO;