let messager;
export default messager = {
    user: {},
    isLogged() {
        return null != window.localStorage.getItem("jwt");
    },
    saveUser(user) {
        window.localStorage.setItem("jwt", user.jwt);
        window.localStorage.setItem("user", JSON.stringify(user.user));
        this.user = user.user;
    },
    restoreUser() {
        this.user = JSON.parse(window.localStorage.getItem("user"));
    },
    async login(login, password) {
        return await fetch("/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                login: login,
                password: password
            })
        });
    }
}