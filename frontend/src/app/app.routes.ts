import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { AuthComponent } from './pages/auth/auth';

export const routes: Routes = [

    {
        path: 'login',
        component: AuthComponent,
        data: {
            mode: 'login',
        },
        title: 'Bejelentkezés | Vesty',
    },

    {
        path: 'register',
        component: AuthComponent,
        data: {
            mode: 'register',
        },
        title: 'Regisztráció | Vesty',
    },

    {
        path: '',
        component: HomeComponent,
        title: 'Vesty – Digitális gardrób és stílusközösség',
    },

    {
        path: '**',
        redirectTo: '',
    },

];
