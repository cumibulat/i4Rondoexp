import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PopupnotifService {

  constructor(
    private alertCtrl: AlertController
  ) { }

  async show(header: string, subHeader: string, message: string, buttons: Array<string>){
    const alert = await this.alertCtrl.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: buttons
    });
    await alert.present();
  }
}
