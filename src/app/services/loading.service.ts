import {
  Injectable
} from '@angular/core';
import {
  LoadingController
} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isDismissing: boolean;
  isShowing: boolean;

  constructor(
    public loadingCtrl: LoadingController
  ) {}

  async present() {
    if (this.isShowing) {
      return
    }

    this.isShowing = true

    await this.loadingCtrl.create({
      spinner: "dots",
    }).then(re => {
      re.present()
      console.log("LoadingService presented", re.id)
    })
  }

  async dismiss() {
    if (this.isShowing) {
      await this.loadingCtrl.dismiss().then(res => {
        if (res) {
          this.isShowing = false
          console.log("LoadingService dismissed", res);
        }
      })
    }
  }
}