import HTTP_STATUS from 'http-status-codes';

import { IUserDocument } from './../../user/interfaces/user.interface';

import { Request, Response } from 'express';
import { userService } from '../../../shared/services/db/user.service';
import { UserCache } from '../../../shared/services/redis/user.cache';

const userCache: UserCache = new UserCache();
export class CurrentUser {
  public async read(req: Request, res: Response): Promise<void> {
    let isUser = false;
    let token = null;
    let user = null;
    const cachedUser: IUserDocument = (await userCache.getUserFromCache(`${req.currentUser!.userId}`)) as IUserDocument;
    const existingUser: IUserDocument = cachedUser ? cachedUser : await userService.getUserByAuthId(`${req.currentUser!.userId}`);
    if (Object.keys(existingUser).length) {
      isUser = true;
      token = req.session?.jwt;
      user = existingUser;
    }
    res.status(HTTP_STATUS.OK).json({ token, isUser, user });
  }
}
