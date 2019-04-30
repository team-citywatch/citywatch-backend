import * as express from "express";
import * as multer from "multer";
import { Op } from "sequelize";
import { Report } from "../database/report.model";
import { getS3Instance } from "../common/s3";
import { User } from "../database/user.model";

const upload = multer({ dest: '../uploads/' });

const REPORT_PER_PAGE = 10;

const parseDate = (value: string[]) => {
  const MAP_MONTH = ["January", "Feburary", "March", "April", "May", "June", "July", "September", "October", "November", "December"];
  const [month, day, year] = value;
  const monthNum = MAP_MONTH.indexOf(month);
  return new Date(parseInt(year, 10), monthNum, parseInt(day, 10)).toISOString();
}

const compileSearch = (value: string) => {
  const splitted = value.split(" ");
  let result = {};
  let category = "";
  let categoryFinished = false;
  let flag = false;
  for (var i = 0; i < splitted.length; i++) {
    const v = splitted[i];
    switch (v) {
      case "since":
        categoryFinished = true;
        const sinceString = parseDate(splitted.slice(i + 1, i + 4));
        result["since"] = sinceString;
        i += 3;
        break;
      case "before":
        categoryFinished = true;
        const beforeString = parseDate(splitted.slice(i + 1, i + 4));
        result["before"] = beforeString;
        i += 3;
        break;
      case "in":
        categoryFinished = true;
        const area = splitted[++i];
        if (area == "NY" || area == "New") {
          result["in"] = "New York";
        } else {
          result["in"] = "San Jose";
        }
        break;
      default:
        if (!categoryFinished) {
          category = category + " " + v;
        } else {
          flag = true;
        }
        break;
    }
    if (flag) { break; }
  }
  result["category"] = category.slice(1, category.length);
  return result;
}

export class ReportRoute {
  public static registerServerRoute(app: express.Application) {
    app.get("/report/", async (req, res) => {
      // for fetch report
      try {
        const keyword = req.query.keyword;
        const result:any = compileSearch(keyword);
        let page = parseInt(req.query.page, 10) || 1;

        let where:any = {}

        if ('category' in result) where.tag = {[Op.like]: `%${result.category}%`}
        if ('since' in result && 'before' in result) where.createdAt = {[Op.between]: [result.since, result.before]}
        if ('in' in result) where.lng = {[result['in'] == 'New York' ? Op.gt : Op.lt]: -114}

        const reports = await Report.findAll({
            limit: REPORT_PER_PAGE * (page - 1),
            offset: REPORT_PER_PAGE,
            where,
            include: [User]
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
