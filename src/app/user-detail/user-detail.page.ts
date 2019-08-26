import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingService } from '../services/loading.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit {

  userId: number;
  userDetail: any = {}; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loadingSvc: LoadingService,
    private userSvc: UserService,
  ) { }


  loadUserDetail(){
    this.loadingSvc.present();
    this.userSvc.getUserDetail(this.userId).subscribe(
      (resp) => {
        this.userDetail = resp['data'];
      },
      (error) => {
        console.log("error load user detail.")
      },
      () => {
        this.loadingSvc.dismiss();
      }
    );
  }

  ionViewDidEnter(){
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadUserDetail();
  }

  goBack(){
    this.router.navigate(['/tabs/tab1']);
  }

  ngOnInit() {
  }



}
