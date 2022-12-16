import { authService } from './../services/db/auth.service';
import { DoneCallback, Job } from 'bull';
import Logger from 'bunyan';
import { config } from '../../config';

const log: Logger = config.createLogger('authWorker');

class AuthWorker {
  async addAuthUserToDB(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { value } = job.data;
      await authService.createAuthUser(value);
      job.progress(100);
      done(null, job.data);
    } catch (err) {
      log.error(err);
      done(err as Error);
    }
  }
}

export const authWorker: AuthWorker = new AuthWorker();
