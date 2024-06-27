import { Routes } from '@angular/router';
import { CreatePageComponent } from './create-page/create-page.component';
import { NewItineraryPageComponent } from './new-itinerary-page/new-itinerary-page.component';
import { SavePageComponent } from './save-page/save-page.component';

export const routes: Routes = [
    { path: 'create', title: 'OnRoot - Create Itinerary', component: CreatePageComponent },
    { path: 'new_itinerary', component: NewItineraryPageComponent },
    { path: 'save', component: SavePageComponent },
    { path: '**', redirectTo: 'create' },
];
