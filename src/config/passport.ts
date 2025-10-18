import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/User";

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, (user as any).id); // store MongoDB _id in session
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id) as Express.User;
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile: Profile, done) => {
      console.log(process.env.GOOGLE_CALLBACK_URL);
      
      try {
        let user: any = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails?.[0].value || "",
            photo: profile.photos?.[0].value,
          });
        }

        return done(null, user as Express.User);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

export default passport;
