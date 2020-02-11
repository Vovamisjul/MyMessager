class UserDAO {
    bd = require("./bdDAO");

    async checkUser(user) {
        let result = await this.bd.perform("select 1 from users where username = ? and password = ?", user.username, user.password);
        return Boolean(result[0]);
    }

    async registerUser(user) {
        return await this.bd.perform("insert into users value (?, ?, ?)", user.username, user.password, user.password);
    }

    async getConversations(username) {
        return await this.bd.perform("select conversations.id, conversations.name from conversations left join user_conversations on conversations.id = user_conversations.conversation_id where user_conversations.username = ?", username);
    }

    async getConversation(id, page) {
        return await this.bd.perform("select text, file, sender_username, date from messages where conversation_id=? limit ?,?", id, page * 20, (page + 1) * 20 - 1);
    }
}

let userDAO = new UserDAO();
module.exports = userDAO;