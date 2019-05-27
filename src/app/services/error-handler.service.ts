import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ErrorNotificationService } from './error-notification.service';

@Injectable()
export class MalariaErrorHandler implements ErrorHandler {
  constructor(
    private injector: Injector,
  ) {}

  handleError(err: any): void {
    const notificationsService = this.injector.get(ErrorNotificationService);
    notificationsService.notify(err);
  }
}
