import * as express from "express";

export class CommentRoute {
  public static registerServerRoute(app: express.Application) {
    app.get("/comment/", (_, res) => {
      // for fetch comment
      res.status(501);
      res.send("Not Implemented")
    })

    app.post("/comment/", (_, res) => {
      // for create comment
      res.status(501);
      res.send("Not Implemented")
    });

    app.delete("/comment/:comment", (_, res) => {
      // for delete comment
      res.status(501);
      res.send("Not Implemented")
    })

    app.put("/comment/:comment", (_, res) => {
      // for update comment
      res.status(501);
      res.send("Not Implemented")
    })
  }
}
