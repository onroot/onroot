import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NewItineraryPageComponent } from '../new-itinerary-page/new-itinerary-page.component';
import { SavePageComponent } from '../save-page/save-page.component';

@Component({
    selector: 'app-nav-bar',
    standalone: true,
    imports: [RouterOutlet, RouterModule],
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
    constructor(private dialogRef: MatDialog) {}

    openNew() {
        this.dialogRef.open(NewItineraryPageComponent);
    }
    openSave() {
        this.dialogRef.open(SavePageComponent);
    }
}
