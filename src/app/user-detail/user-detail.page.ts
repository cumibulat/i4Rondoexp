import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  LoadingService
} from '../services/loading.service';
import {
  UserService
} from '../services/user.service';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  PhoneValidator
} from '../validators/phone';
import {
  PopupnotifService
} from '../services/popupnotif.service';
import {
  Plugins,
  CameraResultType,
  CameraSource
} from '@capacitor/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MultiFileUploadComponent } from '../components/multi-file-upload/multi-file-upload.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit {

  userId: number;
  userDetail: any = {};
  userAttachment: any;
  deviceInfo: string;
  public formUserDetail: FormGroup;
  
  @ViewChild(MultiFileUploadComponent, {static: false}) fileField: MultiFileUploadComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loadingSvc: LoadingService,
    private userSvc: UserService,
    private formBuilder: FormBuilder,
    private popup: PopupnotifService,
    private sanitizer: DomSanitizer
  ) {

    this.formUserDetail = this.formBuilder.group({
      email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      mobileNo: ['', PhoneValidator.isValid]
    });
  }

  saveUserDetail() {
    this.loadingSvc.present();

    // code utk dapetin attachment dan gabungin ke form sebelum di submit ke backend
    let files = this.fileField.getFiles();
    console.log('cek ye isinya :: ', files);
    // let formData = new FormData();
    // formData.append('somekey', 'some value')

    // files.forEach((file) => {
    //   formData.append('files[]', file.rawFile, file.name);
    // });

    if (this.userId > 0) {
      // edit mode
      this.userSvc.updateUser(this.userId, this.formUserDetail.value).subscribe(
        (resp) => {
          this.popup.show(
            "User Updated",
            "",
            "User Updated Succesfully at " + resp['updatedAt'],
            ["OK"],
          )
        },
        (error) => {
          console.log("error load user detail.")
        },
        () => {
          this.loadingSvc.dismiss();
        }
      );
    } else {
      // create new mode
      this.userSvc.createUser(this.formUserDetail.value).subscribe(
        (resp) => {
          this.popup.show(
            "User Created",
            "",
            "User Created Succesfully at " + resp['createdAt'],
            ["OK"],
          )
        },
        (error) => {
          console.log("error load user detail.")
        },
        () => {
          this.loadingSvc.dismiss();
        }
      );
    }
  }

  loadUserDetail() {
    this.loadingSvc.present();
    this.userSvc.getUserDetail(this.userId).subscribe(
      (resp) => {
        this.userDetail = resp['data'];
        this.formUserDetail.patchValue(resp['data']);
      },
      (error) => {
        console.log("error load user detail.")
      },
      () => {
        this.loadingSvc.dismiss();
      }
    );
  }

  async addAttachment() {
    // if (deviceInfo.platform === "web") {
    //   // web access 
    // } else if (deviceInfo.platform === "android") {
    //   //android smartphone access

      const image = await Plugins.Camera.getPhoto({
          quality: 100,
          allowEditing: false,
          resultType: CameraResultType.DataUrl,
          source: CameraSource.Camera
        })
        .catch(() => {
          console.log("cancel take photo");
        });

      this.userAttachment = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
    // }
  }

  ionViewDidEnter() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    Plugins.Device.getInfo().then((info) => {
      this.deviceInfo = info.platform;
    });

    if (this.userId > 0) {
      this.loadUserDetail();
    }

  }

  goBack() {
    this.router.navigate(['/tabs/tab1']);
  }

  ngOnInit() {}



}