let messager;
export default messager = {
    user: null,
    jwt: "",
    resendingReq: false,
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
        return await this.sendRequest("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
    },
    async register(username, password, repeatPassword) {
        return await this.sendRequest("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password,
                repeatPassword: repeatPassword
            })
        });
    },
    async getConversations() {
        return await this.sendRequest(`/api/conversations?username=${this.user.username}`, {
            headers: {
                "Authorization": `Bearer ${this.jwt.token}`
            }
        });
    },
    async getConversation(id) {
        return await this.sendRequest(`/api/conversation?id=${id}&page=0`, {
            headers: {
                "Authorization": `Bearer ${this.jwt.token}`
            }
        });
    },
    async sendMessage(conversationId, text, file, onFileSend) {
        console.log(file ? file.name : null);
        let result = await this.sendRequest("/api/sendMessage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.jwt.token}`
            },
            body: JSON.stringify({
                username: this.user.username,
                conversationId: conversationId,
                text: text,
                fileName: file ? file.name : null
            })
        });
        if (file) {
            let formData = new FormData();
            formData.append('file', file);
            fetch(`/api/addFile?messageId=${result.id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${this.jwt.token}`
                },
                body: formData
            }).then(response => onFileSend(response));
        }
        return result;
    },
    async downloadFile(messageId) {
        let response = await fetch(`/api/getFile?messageId=${messageId}`, {
            headers: {
                "Authorization": `Bearer ${this.jwt.token}`
            }
        });
        if (!response.ok) {
            throw new Error(response.status.toString())
        }
        let result = await response.json();
    },
    async getFriends() {
        return await this.sendRequest(`api/friends?username=${this.user.username}`, {
            headers: {
                "Authorization": `Bearer ${this.jwt.token}`
            }
        });
    },
    async sendFriendRequest(friendUsername) {
        await this.sendRequest("api/friendRequest", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.jwt.token}`
            },
            body: JSON.stringify({
                friendUsername: friendUsername,
                username: this.user.username
            })
        });
    },
    async findUsers(username) {
        return await this.sendRequest(`api/findUsers?username=${this.user.username}&searchUsername=${username}`, {
            headers: {
                "Authorization": `Bearer ${this.jwt.token}`
            }
        });
    },
    async sendRequest(route, params) {
        let response = await fetch(route, params);
        if (!response.ok) {
            if (response.status === 401 && !this.resendingReq) {
                this.resendingReq = true;
                await this.updateToken();
                params.headers["Authorization"] = `Bearer ${this.jwt.token}`;
                return await this.sendRequest(route, params);
            }
            if (this.resendingReq)
                throw new Error(response.status.toString());
        }
        return await response.json();
    },
    async updateToken() {
        this.jwt = await this.sendRequest("/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({refreshToken: this.jwt.refreshToken})
        });
        window.localStorage.setItem("user_info", JSON.stringify({
            user: this.user,
            jwt: this.jwt
        }));
    }
}