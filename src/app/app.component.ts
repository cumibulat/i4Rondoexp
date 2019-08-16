import {
  Component
} from '@angular/core';

import {
  Platform
} from '@ionic/angular';
import {
  SplashScreen
} from '@ionic-native/splash-screen/ngx';
import {
  StatusBar
} from '@ionic-native/status-bar/ngx';
import {
  AuthenticationService
} from './services/authentication.service';
import {
  Router
} from '@angular/router';
import {
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed, 
  Plugins} from '@capacitor/core';

const { PushNotifications } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if (this.platform.is('android')) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();

        // On succcess, we should be able to receive notifications
        PushNotifications.addListener('registration',
          (token: PushNotificationToken) => {
            alert('Push registration success, token: ' + token.value);
          }
        );

        // Some issue with our setup and push will not work
        PushNotifications.addListener('registrationError',
          (error: any) => {
            alert('Error on registration: ' + JSON.stringify(error));
          }
        );

        // Show us the notification payload if the app is open on our device
        PushNotifications.addListener('pushNotificationReceived',
          (notification: PushNotification) => {
            alert('Push received: ' + JSON.stringify(notification));
          }
        );

        // Method called when tapping on a notification
        PushNotifications.addListener('pushNotificationActionPerformed',
          (notification: PushNotificationActionPerformed) => {
            alert('Push action performed: ' + JSON.stringify(notification));
          }
        );
      }

      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['tabs']);
        } else {
          this.router.navigate(['login']);
        }
      });
    });
  }
}