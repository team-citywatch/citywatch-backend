import { createServer, Server } from "http";
import * as express from "express";
import * as cors from "cors";
import * as passport from "passport";
import * as constants from "./common/constants";
const FacebookStrategy = require("passport-facebook").Strategy;

import { DefaultRoute } from "./route/default";
import { ReportRoute } from "./route/report";
import { factory } from "./common/logger";
import { getDatabaseInstance } from "./database";

const log = factory.getLogger("ServerContext")

export class ServerContext {
  public static readonly PORT: string = process.env.PORT || "8080";
  private app: express.Application;
  private server: Server;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    
    passport.use(new FacebookStrategy({
      clientID: constants.FACEBOOK_APP_ID,
      clientSecret: constants.FACEBOOK_APP_SECRET,
      callbackURL: constants.FACEBOOK_CALLBACK_URL
    }, (accessToken: string, refreshToken: string, profile: any, done: any) => {
        // TODO: Do something related with user record
        // User.findOrCreate(..., function(err, user) {
        //   if (err) { return done(err); }
        //   done(null, user);
        // });
      }
    ));

    this.server = createServer(this.app);
    getDatabaseInstance().sync();

    this.registerServerRoutes();
  }

  public listen(): void {
    this.server.listen(
      parseInt(ServerContext.PORT, 10),
      "0.0.0.0",
      undefined,
      () => {
        log.info(
          `Server starts to listen at port ${ServerContext.PORT}`,
        );
      }
    );
  }

  public getApp(): express.Application {
    return this.app;
  }

  private registerServerRoutes() {
    DefaultRoute.registerServerRoute(this.app);
    ReportRoute.registerServerRoute(this.app);

    this.app.get("*", (req, res) => {
      res.status(404);
      res.send();
    });
  }
}
