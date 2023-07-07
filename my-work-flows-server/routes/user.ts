import express, { NextFunction, Request, Response } from 'express'
import { getUserWithSession, logout, register } from '../controllers/auth'
import { passport } from '../middleware/passport'
import { UnauthenticatedError } from '../errors/unauthenticatedError'
import { getUsers } from '../controllers/user'
import { isAuthenticated } from '../middleware/auth'

const router = express.Router()

router.post('/register', register)

router.post('/login',
  passport.authenticate('local', {failureMessage: true}),
  function(req: Request, res: Response, next: NextFunction) {
    if (req.user){
      res.send({user: req.user});
    } else {
      next(new UnauthenticatedError(UnauthenticatedError.messages.INVALID));
    }
})

router.get('/me', isAuthenticated, getUserWithSession);
router.get('/', getUsers);

router.post('/logout', logout);


export default router;