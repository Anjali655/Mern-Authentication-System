import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/userModel.js';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails[0].value;

            let user = await User.findOne({
                $or: [
                    { googleId: profile.id },
                    { email }
                ]
            });

            if (!user) {
                // 🔹 New user
                user = await User.create({
                    googleId: profile.id,
                    email,
                    username: profile.displayName,
                    avatar: profile.photos[0].value,
                    isLoggedIn: true,
                    isVerified: true,
                });
            } else {
                // 🔹 Existing user → link Google account
                if (!user.googleId) {
                    user.googleId = profile.id;
                }
                user.isLoggedIn = true;
                user.isVerified = true;
                await user.save();
            }

            return done(null, user);
        } catch (error) {
            return done(error, null);
        }
    }


));

export default passport;
