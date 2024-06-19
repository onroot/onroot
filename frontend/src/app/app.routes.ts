import { Routes } from '@angular/router';
import { CreatePageComponent } from './create-page/create-page.component';

export const routes: Routes = [
    { path: 'create', title: 'OnRoot - Create Itinerary', component: CreatePageComponent },
    { path: '**', redirectTo: 'create' },
];
