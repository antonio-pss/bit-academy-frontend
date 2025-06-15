import {Routes} from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {HomeComponent} from "./components/home/home.component";
import {ClassroomComponent} from './components/classroom/classroom.component';
import {SettingsComponent} from './components/settings/settings.component';
import {ActivityComponent} from './components/classroom/activity/activity.component';
import {MyClassComponent} from './components/my-class/my-class.component';
import {StudentClassComponent} from './components/student-class/student-class.component';
import {TeacherClassComponent} from './components/teacher-class/teacher-class.component';


export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'teacher-class', component: TeacherClassComponent},
      {path: 'student-class', component: StudentClassComponent},
      {path: 'classroom/:id', component: ClassroomComponent},
      {path: 'activity', component: ActivityComponent},
    ],
  }
];
