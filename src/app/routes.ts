import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import {SingleComponent} from './single/single.component';
import {AddComponent} from './add/add.component';

export const AppRoutes: Routes = [
    { path: 'home', component: MainComponent},
    { path: 'single/:id', component: SingleComponent},
    { path: 'add', component: AddComponent},
    { path: '**', redirectTo: 'home'},
];
