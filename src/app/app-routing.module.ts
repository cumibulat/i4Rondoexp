import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { TabsPage } from './tabs/tabs.page';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  {
    path: 'tabs',
    component: TabsPage,
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  // { 
  //   path: 'tabs', 
    // canActivate: [AuthGuard],
    // loadChildren: './members/member-routing.module#MemberRoutingModule'
    // loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    // loadChildren: './tabs/tabs.module#TabsPageModule'
  // },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
