import * as express from 'express';

export class DefaultRoute {
  public static registerServerRoute(app: express.Application) {
    app.get("/health", (req, res) => {
      res.status(200);
      res.send("OK");
    });
  }
}
