import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserDetailPage } from './user-detail.page';
import { FileUploadModule } from 'ng2-file-upload';
import { MultiFileUploadComponent } from '../components/multi-file-upload/multi-file-upload.component';

const routes: Routes = [
  {
    path: '',
    component: UserDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FileUploadModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserDetailPage, MultiFileUploadComponent]
})
export class UserDetailPageModule {}
