import * as express from "express";
import passport = require("passport");

export class AuthRoute {
  public static registerServerRoute(app: express.Application) {
    app.get("/auth/", passport.authenticate('facebook'));

    app.get("/auth/callback", passport.authenticate('facebook', { 
        successRedirect: '/',
        failureRedirect: '/?login_failure=1' 
    }));
  }
}
