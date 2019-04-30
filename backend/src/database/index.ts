import * as constants from "../common/constants";
import { Sequelize, ISequelizeConfig } from "sequelize-typescript";
import { factory } from "../common/logger";

import { Report } from "./report.model";
import { User } from "./user.model";
import { Comment } from "./comment.model";
import { Tag } from "./tag.model";


const log = factory.getLogger("Database");

export class Database {
  protected static readonly sequelizeConfig: ISequelizeConfig = {
    host: constants.DB_ENDPOINT,
    database: constants.DB_NAME,
    dialect: "mysql",
    username: constants.DB_USERNAME,
    password: constants.DB_PASSWORD,
    define: {
      charset: "utf8",
      collate: "utf8_general_ci",
    },
    logging: false
  };

  protected instance: Sequelize;

  constructor() {
    log.info("Initialize MySQL Connection");
    this.instance = new Sequelize(Database.sequelizeConfig);
    this.instance.addModels([Comment, Report, User, Tag]);
  }

  public sync() {
    // CAUTION
    // These instructions will be force alter the database when scheme changed.
    // If you don't want this action, change 'true' to 'false' on two lines below.
    Comment.sync();
    Report.sync();
    User.sync();
    Tag.sync();

    log.info("Sync finished");
    return this;
  }
}

let database: Database;

export const getDatabaseInstance = () => {
  if (!database) { database = new Database(); }
  return database;
};
