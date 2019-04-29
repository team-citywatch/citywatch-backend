import * as express from "express";

export class ReportRoute {
  public static registerServerRoute(app: express.Application) {
    app.get("/report/", (_, res) => {
      // for fetch report
      res.status(501);
      res.send("Not Implemented")
    })

    app.post("/report/", (_, res) => {
      // for create report
      res.status(501);
      res.send("Not Implemented")
    });

    app.delete("/report/:report", (_, res) => {
      // for delete report
      res.status(501);
      res.send("Not Implemented")
    })

    app.put("/report/:report", (_, res) => {
      // for update report
      res.status(501);
      res.send("Not Implemented")
    })

    app.delete("/report/:report/image", (_, res) => {
      // for delete an image in report
      res.status(501);
      res.send("Not Implemented")
    })

    app.post("/report/:report/image", (_, res) => {
      // for update an image in report
      res.status(501);
      res.send("Not Implemented")
    })
  }
}
