import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NewItineraryPageComponent } from '../new-itinerary-page/new-itinerary-page.component';
import { SavePageComponent } from '../save-page/save-page.component';
import { CardLockingService } from '../card-locking.service';

@Component({
    selector: 'app-nav-bar',
    standalone: true,
    imports: [RouterOutlet, RouterModule],
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
    isLocked = this.lockService.isLocked();

    constructor(
        private dialogRef: MatDialog,
        private lockService: CardLockingService,
    ) {}

    openNew(): void {
        this.dialogRef.open(NewItineraryPageComponent);
    }
    openSave(): void {
        this.dialogRef.open(SavePageComponent);
    }

    toggleLock(): void {
        this.lockService.toggleLockCards();
    }
}
