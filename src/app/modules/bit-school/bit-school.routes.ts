import {Routes} from '@angular/router';
import {MainComponent} from './main/main.component';
import {HomeComponent} from './components/home/home.component';
import {StudentsComponent} from './components/students/students.component';
import {ClassComponent} from './components/class/class.component';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {path: '', redirectTo: 'home', pathMatch: 'full'},
            {path: 'home', component: HomeComponent},
            {path: 'courses', component: ClassComponent},
            {path: 'students', component: StudentsComponent},
        ],
    },
    {path: '**', redirectTo: ''}
];
