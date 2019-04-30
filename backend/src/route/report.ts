import * as express from "express";
import * as multer from "multer";
import { Op } from "sequelize";
import { Report } from "../database/report.model";
import { getS3Instance } from "src/common/s3";

const upload = multer({ dest: '/uploads/' });

const REPORT_PER_PAGE = 10;

export class ReportRoute {
  public static registerServerRoute(app: express.Application) {
    app.get("/report/", async (req, res) => {
      // for fetch report
      try {
        const keyword = req.query.keyword;
        let page = parseInt(req.query.page, 10) || 1;

        const reports = await Report.findAll(
          keyword && {
            limit: REPORT_PER_PAGE * (page - 1),
            offset: REPORT_PER_PAGE,
            where: {
              content: {
                [Op.like]: keyword
              }
            }
          }
        );

        res.send({
          reports
        });
      } catch (reason) {
        res.status(500);
        res.send({ message: `database error: ${reason}` });
      }
    });

    app.post("/report/", async (req, res) => {
      // for create report
      // TODO : auth
      const report = Report.build({
        ...req.body,
        createdAt: undefined,
        updatedAt: undefined,
        id: undefined
      });

      try {
        await report.save();
        res.send({ message: "success" });
      } catch (reason) {
        res.status(400);
        res.send({ message: reason });
      }
    });

    app.delete("/report/:report", async (req, res) => {
      // for delete report
      const reportId = req.params.report;

      try {
        const report = await Report.findOne({
          where: {
            id: reportId
          }
        });
        if (report) {
          await report.destroy();
          res.send({ message: "success" });
        } else {
          res.status(400);
          res.send({ message: `Report ${reportId} does not exist` });
        }
      } catch (reason) {
        res.status(500);
        res.send({ message: `database error: ${reason}` });
      }
    });

    app.put("/report/:report", async (req, res) => {
      // for update report
      const reportId = req.params.report;
      try {
        const report = await Report.findOne({
          where: {
            id: reportId
          }
        });

        if (report) {
          let payload = req.body || {};
          delete payload["id"];
          delete payload["createdAt"];
          delete payload["updatedAt"];

          await report.update(payload);
          res.send(200);
          res.send({ message: "success" });
        } else {
          res.status(400);
          res.send({ message: `Report ${reportId} does not exist` });
        }
      } catch (reason) {
        res.status(500);
        res.send({ message: `database error: ${reason}` });
      }
    });

    app.delete("/report/:report/image", (req, res) => {
      // for delete an image in report
      res.status(501);
      res.send("Not Implemented");
    });

    app.post("/report/:report/image", upload.single('image'), async (req, res) => {
      // for update an image in report
      const reportId = req.params.report;
      try {
        const report = await Report.findOne({
          where: {
            id: reportId
          }
        });

        if (report) {
          getS3Instance().putImage(req.file.filename, req.file);
          let patch = {
            image: req.file.filename
          }
          await report.update(patch);
          res.send(200);
          res.send({ message: "success" });
        } else {
          res.status(400);
          res.send({ message: `Report ${reportId} does not exist` });
        }
      } catch (reason) {
        res.status(500);
        res.send({ message: `database error: ${reason}` });
      }
    });
  }
}
