import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Subject } from 'rxjs';

@Injectable()
export class ErrorNotificationService {
  private subject = new Subject<any>();

  constructor(
    private alertCtrl: AlertController,
  ) {

  }

  public notify(error) {
    this.subject.next(error);
  }

  public listen(listener) {
    this.subject.subscribe(listener);
  }

}