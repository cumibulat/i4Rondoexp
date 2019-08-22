import { Component } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  photo: SafeResourceUrl;
  listShoppingCart: Array<any>;
  deliveryAddress: string;

  constructor(private sanitizer: DomSanitizer) {}

  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    })
    .catch(()=>{
      console.log("cancel take photo");
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }

  ionViewWillEnter(){
    this.listShoppingCart = [
      {
        name: "Mangga",
        qty: "2",
      },
      {
        name: "Jambu",
        qty: "3",
      },
      {
        name: "Salak",
        qty: "8",
      },
    ];

    this.deliveryAddress = "Kota Kasablanka Office 88. 18th Floor. South Jakarta."
  }

}
