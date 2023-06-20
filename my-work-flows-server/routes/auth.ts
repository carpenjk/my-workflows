import express, { NextFunction, Request, Response } from 'express'
import { register } from '../controllers/auth'
import { passport } from '../middleware/passport'
import { UnauthenticatedError } from '../errors/unauthenticatedError'

const router = express.Router()

router.post('/register', register)

router.post('/login',
  passport.authenticate('local', {failureMessage: true}),
  function(req: Request, res: Response, next: NextFunction) {
    if (req.user){
      res.send({user: req.user});
    } else {
      next(new UnauthenticatedError('Invalid email or password.'));
    }
})

export default router;