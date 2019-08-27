import {
  Component,
  OnInit
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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhoneValidator } from '../validators/phone';
import { PopupnotifService } from '../services/popupnotif.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit {

  userId: number;
  userDetail: any = {};
  public formUserDetail: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loadingSvc: LoadingService,
    private userSvc: UserService,
    private formBuilder: FormBuilder,
    private popup: PopupnotifService
  ) {

    this.formUserDetail = this.formBuilder.group({
      email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      mobileNo: ['', PhoneValidator.isValid]
    });
  }

  saveUserDetail() {
    this.loadingSvc.present();
    if(this.userId > 0){
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
      console.log("masuk created.")
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

  ionViewDidEnter() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.userId > 0) {
      this.loadUserDetail();
    }

  }

  goBack() {
    this.router.navigate(['/tabs/tab1']);
  }

  ngOnInit() {}



}