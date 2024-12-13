import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'landing',
        loadComponent: ()=> import('./landing/landing.component').then((m)=> m.LandingComponent),
    },
];
