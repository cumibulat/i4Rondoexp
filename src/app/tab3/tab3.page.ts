import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    private authService: AuthenticationService
  ) {
    
  }

  goToUlasan(){
    console.log('masuk ulasan')
  }

  goToKomplain(){
    console.log('masuk komplain')
  }

  doLogout(){
    this.authService.logout();
  }


}
