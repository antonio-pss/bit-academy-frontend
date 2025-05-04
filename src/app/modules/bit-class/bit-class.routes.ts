import {Routes} from '@angular/router';
import {MainClassComponent} from "./components/main-class/main.component";
import {HomeComponent} from "./components/home/home.component";

export const routes: Routes = [
  {
    path: '',
    component: MainClassComponent,
    children: [
      { path: 'home', component: HomeComponent },
    ]
  }
];
