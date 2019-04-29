import {LoggerFactoryOptions, LFService, LogGroupRule, LogLevel} from "typescript-logging";

const options = new LoggerFactoryOptions()
.addLogGroupRule(new LogGroupRule(new RegExp("manager.+"), LogLevel.Debug))
.addLogGroupRule(new LogGroupRule(new RegExp("executor.+"), LogLevel.Debug))
.addLogGroupRule(new LogGroupRule(new RegExp(".+"), LogLevel.Info));

export const factory = LFService.createNamedLoggerFactory("LoggerFactory", options);

factory.getLogger("Logger").info("Initiated");
