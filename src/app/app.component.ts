import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MalariaErrorHandler } from './services/error-handler.service';
import { ErrorNotificationService } from './services/error-notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertCtrl: AlertController,
    private errorNotifications: ErrorNotificationService,
  ) {
    this.initializeApp();

    this.errorNotifications.listen(async error => {
      const message = 'An error has occurred. Please reload.';

      const alert = await this.alertCtrl.create({
        backdropDismiss: false,
        message,
      });
      alert.present();
    });
  }



  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
