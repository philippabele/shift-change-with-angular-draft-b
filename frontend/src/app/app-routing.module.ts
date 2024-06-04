import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { SettingsComponent } from './pages/settings/settings.component';


const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
     path:'',
     component: LayoutComponent,
     children: [{
       path: 'home',
       component: HomeComponent
     },
     {
      path:'settings',
      component: SettingsComponent
     }]
  },
  {
    path:'**',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
