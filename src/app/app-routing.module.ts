import { MyfilesComponent } from './components/myfiles/myfiles.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ExploreComponent } from './components/explore/explore.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },

      { path: 'explore', component: ExploreComponent },
      { path: 'myfiles', component: MyfilesComponent },
      { path: 'explore/:filter', component: ExploreComponent },
    ],
  },
  { path: 'auth/:mode', component: LoginComponent },
  { path: 'logout', redirectTo: 'auth/logout' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
