import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventsService } from '../events.service';
import { SimpleEvent } from '../shared/models/event';
import { MatDialog } from '@angular/material/dialog';
import { SavePageComponent } from '../save-page/save-page.component';

@Component({
    selector: 'app-new-itinerary-page',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './new-itinerary-page.component.html',
    styleUrl: './new-itinerary-page.component.css',
})
export class NewItineraryPageComponent {
    constructor(
        private eventService: EventsService,
        private dialogRef: MatDialog,
    ) {}

    openSave() {
        this.dialogRef.open(SavePageComponent);
    }

    triggerFileInput(): void {
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        fileInput.click();
    }

    loadFromJSON(event: Event): void {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const jsonString = e.target?.result as string;
                this.addEventsFromJson(jsonString);
            };
            reader.readAsText(file);
        }
    }

    addEventsFromJson(jsonString: string) {
        const jsonData = JSON.parse(jsonString);

        jsonData.forEach((eventData: any) => {
            const simpleEvent = new SimpleEvent({
                title: eventData.title,
                placeId: eventData.placeId,
                placeName: eventData.placeName,
                startTime: eventData.startTime,
                endTime: eventData.endTime,
                imgUrl: eventData.imgUrl,
                notes: eventData.notes,
            });
            this.eventService.addSimpleEvent(simpleEvent);
        });
    }
}
