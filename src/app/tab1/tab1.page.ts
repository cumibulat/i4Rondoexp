import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  listUser: Array<any>;
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(
    private userSvc: UserService,
    private loadingSvc: LoadingService
  ) {}

  loadListUser(){
    this.loadingSvc.present();
    this.userSvc.getUsers(this.currentPage).subscribe(
      (resp) => {
        this.listUser = resp['data'];
        this.totalPages = resp['total_pages'];
      },
      (error) => {
        console.log("error load list user.")
      },
      () => {
        this.loadingSvc.dismiss();
      }
    );
  }

  goNextPage(){
    this.currentPage += 1;
    this.loadListUser();
  }

  goPreviousPage(){
    this.currentPage -= 1;
    this.loadListUser();
  }

  ionViewDidEnter(){
    this.currentPage = 1;
    this.totalPages = 0;
    this.listUser = [];
    this.loadListUser();
  }

}
