"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express = require("express");
const cors = require("cors");
const default_1 = require("./route/default");
const logger_1 = require("./common/logger");
const log = logger_1.factory.getLogger("ServerContext");
class ServerContext {
    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors());
        this.server = http_1.createServer(this.app);
        this.registerServerRoutes();
    }
    listen() {
        this.server.listen(parseInt(ServerContext.PORT, 10), "0.0.0.0", undefined, () => {
            log.info(`Server starts to listen at port ${ServerContext.PORT}`);
        });
    }
    getApp() {
        return this.app;
    }
    registerServerRoutes() {
        default_1.DefaultRoute.registerServerRoute(this.app);
        this.app.get("*", (req, res) => {
            res.status(404);
            res.send();
        });
    }
}
ServerContext.PORT = process.env.PORT || "8080";
exports.ServerContext = ServerContext;
//# sourceMappingURL=server.js.map