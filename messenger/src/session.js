class Session {
    constructor() {
        this.obj = {};
    }

    get(key) {
        return this.obj[key];
    }

    put(key, target) {
        this.obj[key] = target;
    }
}

let session;

module.exports = function () {
    if (!session) session = new Session();
    return session;
}