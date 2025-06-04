import {Routes} from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {HomeComponent} from "./components/home/home.component";
import {ClassroomComponent} from './components/classroom/classroom.component';
import {SettingsComponent} from './components/settings/settings.component';


export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'classroom/:id', component: ClassroomComponent},
    ],
  }
];
