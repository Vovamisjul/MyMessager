class ConversationDAO {
    bd = require("./bdDAO");

    async getConversations(username) {
        return await this.bd.perform("select conversations.id, conversations.name from conversations left join user_conversations on conversations.id = user_conversations.conversation_id where user_conversations.username = ?", username);
    }

    async getConversation(id, page) {
        return await this.bd.perform("select id, text, sender_username, date from messages where conversation_id = ?", id);
        //return await this.bd.perform("select id, text, file_name, sender_username, date from messages where conversation_id = ? limit ?, ?", id, page * 20, (page + 1) * 20 - 1);
    }

    async addFile(fileName, messageId) {
        let result = await this.bd.perform("insert into files value (null, ?, ?)", fileName, messageId);
        await this.bd.perform("update messags set file_id = ? where id = ?", result.insertId, messageId);
        return result.insertId;
    }

    async getFile(messageId) {
        let result = await this.bd.perform("select file, file_name from messages where id = ?", messageId);
        return result[0];
    }

    async createConversation(name, users) {
        let result = await this.bd.perform("insert into conversations value (null, ?)", name);
        let values = [];
        for (let user of users) {
            values.push([user, result.insertId, 0])
        }
        await this.bd.perform("insert into user_conversations (username, conversation_id, unread_messages_count) values ?", values);
        return {
            id: result.insertId,
            name: name
        };
    }
}

let conversationDAO = new ConversationDAO();
module.exports = conversationDAO;