let messager;
export default messager = {
    user: null,
    jwt: "",
    isLogged() {
        return Boolean(this.user);
    },
    saveUser(user) {
        window.localStorage.setItem("user_info", JSON.stringify(user));
        this.user = user.user;
        this.jwt = user.jwt;
    },
    restoreUser() {
        let userInfo = JSON.parse(window.localStorage.getItem("user_info"));
        if (!userInfo)
            return;
        this.user = userInfo.user;
        this.jwt = userInfo.jwt;
    },
    logout() {
        this.user = null;
        this.jwt = "";
        window.localStorage.removeItem("user_info");
    },
    async login(username, password) {
        return await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": `Bearer ${this.jwt}`
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
    },
    async register(username, password, repeatPassword) {
        return await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": `Bearer ${this.jwt}`
            },
            body: JSON.stringify({
                username: username,
                password: password,
                repeatPassword: repeatPassword
            })
        });
    },
    async getConversations() {
        return await fetch(`/api/conversations?username=${this.user.username}`, {
            headers: {
                "Authorization": `Bearer ${this.jwt}`
            }
        });
    },
    async getConversation(id) {
        return await fetch(`/api/conversation?id=${id}&page=0`, {
            headers: {
                "Authorization": `Bearer ${this.jwt}`
            }
        });
    },
    async sendMessage(conversationId, message) {
        return await fetch("/../api/sendMessage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": `Bearer ${this.jwt}`
            },
            body: JSON.stringify({
                username: this.user.username,
                conversationId: conversationId,
                message: message
            })
        });
    }
}