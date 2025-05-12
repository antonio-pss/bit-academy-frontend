import {Routes} from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {HomeComponent} from "./components/home/home.component";


export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'home', component: HomeComponent },
      {path: '**', redirectTo: 'home'}
    ]
  }
];
