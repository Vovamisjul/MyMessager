class ConversationDAO {
    bd = require("./bdDAO");

    async getConversations(username) {
        return await this.bd.perform("select conversations.id, conversations.name from conversations left join user_conversations on conversations.id = user_conversations.conversation_id where user_conversations.username = ?", username);
    }

    async getConversation(id, page) {
        return await this.bd.perform("select id, text, file_name, sender_username, date from messages where conversation_id = ?", id);
        //return await this.bd.perform("select id, text, file_name, sender_username, date from messages where conversation_id = ? limit ?, ?", id, page * 20, (page + 1) * 20 - 1);
    }

    async addFile(id, file) {
        await this.bd.perform("update messages set file = ? where id = ?", file, id);
    }

    async getFile(messageId) {
        let result = await this.bd.perform("select file, file_name from messages where id = ?", messageId);
        return result[0];
    }
}

let conversationDAO = new ConversationDAO();
module.exports = conversationDAO;