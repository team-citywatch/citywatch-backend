import { createServer, Server } from "http";
import * as express from "express";
import * as cors from "cors";

import { DefaultRoute } from "./route/default";
import { ReportRoute } from "./route/report";
import { factory } from "./common/logger";
import { getDatabaseInstance } from "./database";
import { UserRoute } from "./route/user";

const log = factory.getLogger("ServerContext")

export class ServerContext {
  public static readonly PORT: string = process.env.PORT || "8080";
  private app: express.Application;
  private server: Server;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());

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
    UserRoute.registerServerRoute(this.app);

    this.app.get("*", (req, res) => {
      res.status(404);
      res.send();
    });
  }
}
