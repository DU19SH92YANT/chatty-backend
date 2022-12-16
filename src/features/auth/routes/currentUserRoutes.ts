import { authMiddleware } from './../../../shared/globals/helpers/auth-middleware';
import express, { Router } from 'express';

import { CurrentUser } from '../controllers/current-user';
class CurrentUserRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/currentUser', authMiddleware.checkAuthentication, CurrentUser.prototype.read);

    return this.router;
  }
}

export const currentUserRoutes: CurrentUserRoutes = new CurrentUserRoutes();
