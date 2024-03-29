import { MyfilesComponent } from './components/myfiles/myfiles.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ExploreComponent } from './components/explore/explore.component';
import { LibraryComponent } from './components/library/library.component';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },

      { path: 'explore', component: ExploreComponent },
      { path: 'uploads', component: MyfilesComponent },
      { path: 'library', component: LibraryComponent },
      { path: 'explore/:filter', component: ExploreComponent },
    ],
  },
  { path: 'login', component: LandingComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
