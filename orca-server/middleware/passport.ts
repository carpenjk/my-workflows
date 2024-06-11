import _passport from 'passport';
import { Strategy } from 'passport-local';
import { verify } from '../controllers/auth';
import { User } from '../models/User';

_passport.use(new Strategy({usernameField: 'email', }, verify));

_passport.serializeUser(User.serializeUser);

_passport.deserializeUser(User.deserializeUser);

export const passport = _passport