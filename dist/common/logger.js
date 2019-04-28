"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_logging_1 = require("typescript-logging");
const options = new typescript_logging_1.LoggerFactoryOptions()
    .addLogGroupRule(new typescript_logging_1.LogGroupRule(new RegExp("manager.+"), typescript_logging_1.LogLevel.Debug))
    .addLogGroupRule(new typescript_logging_1.LogGroupRule(new RegExp("executor.+"), typescript_logging_1.LogLevel.Debug))
    .addLogGroupRule(new typescript_logging_1.LogGroupRule(new RegExp(".+"), typescript_logging_1.LogLevel.Info));
exports.factory = typescript_logging_1.LFService.createNamedLoggerFactory("LoggerFactory", options);
exports.factory.getLogger("Logger").info("Initiated");
//# sourceMappingURL=logger.js.map