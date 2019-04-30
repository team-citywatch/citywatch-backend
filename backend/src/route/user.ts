import * as express from "express";
import { User } from "src/database/user.model";

export class UserRoute {
  public static registerServerRoute(app: express.Application) {
    app.post("/user", async (req, res) => {
        const user = User.build({
            ...req.body,
            createdAt: undefined,
            updatedAt: undefined
        });
    
        try {
            await user.save();
            res.send({ message: "success" });
        } catch (reason) {
            res.status(400);
            res.send({ message: reason });
        }
    });

    app.get("/user/:id", async (req, res) => {
        try {
            const id = req.params.id;

            const user = await User.findOne({
                where: {
                    psid: id
                }
            });

            res.send({ user });
        } catch (reason) {
            res.status(500);
            res.send({ message: `database error: ${reason}` });
        }
    });
  }
}
