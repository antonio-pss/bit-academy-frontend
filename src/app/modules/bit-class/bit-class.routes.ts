import {Routes} from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {HomeComponent} from "./components/home/home.component";
import {ClassroomComponent} from './components/classroom/classroom.component';
import {SettingsComponent} from './components/settings/settings.component';
import {ActivityComponent} from './components/classroom/activity/activity.component';
import {MyClassComponent} from './components/my-class/my-class.component';


export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'my-class', component: MyClassComponent},
      {path: 'classroom/:id', component: ClassroomComponent},
      {path: 'activity', component: ActivityComponent},
    ],
  }
];
