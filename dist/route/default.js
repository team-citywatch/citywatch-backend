"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DefaultRoute {
    static registerServerRoute(app) {
        app.get("/health", (req, res) => {
            res.status(200);
            res.send("OK");
        });
    }
}
exports.DefaultRoute = DefaultRoute;
//# sourceMappingURL=default.js.map