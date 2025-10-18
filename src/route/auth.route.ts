import { Router } from "express";
import { errorHandler } from "../exception/errorHandler";
import { AuthController } from "../controller/auth.controller";
import passport from "../config/passport";
import session from "express-session";
import { config } from "../config/config";

const router = Router();

router.use(
  session({
    secret: config.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
router.use(passport.initialize());
router.use(passport.session());

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    console.log("Redirecting...");
    
    // Redirect back to React app after login success
    res.redirect(process.env.FRONTEND_URL || "http://localhost:5173");
  }
);

export default router;
