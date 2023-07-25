
import { StatusCodes } from 'http-status-codes'
import { CustomAPIError } from './customAPIError';


export class UnauthenticatedError extends CustomAPIError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
  static messages = {
    INVALID: 'Invalid email or password.',
    LOGGED_OUT: 'User must log in.'
  }
}
