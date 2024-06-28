import { Component } from '@angular/core';
import { EventsService } from '../events.service';
import { ExtendedEvent, UrlExportableEvent } from '../shared/models/event';
import qs from 'qs';
import { ImageExportService } from '../image-export.service';

@Component({
    selector: 'app-save-page',
    standalone: true,
    templateUrl: './save-page.component.html',
    styleUrl: './save-page.component.css',
})
export class SavePageComponent {
    constructor(
        private eventService: EventsService,
        private imageExportService: ImageExportService,
    ) {}

    copyURL(element: HTMLElement): void {
        const extendedEvents: ExtendedEvent[] = this.eventService.getEvents()();
        const exportableEvents: UrlExportableEvent[] = extendedEvents.map((data) =>
            data.toUrlExportableEvent(),
        );
        const encodedExportableEvents: string = qs.stringify(
            { 0: exportableEvents },
            { skipNulls: true },
        );

        const host = window.location.host;
        const queryParams = new URLSearchParams({ events: encodedExportableEvents });
        const url = `${host}/create?${queryParams.toString()}`;

        navigator.clipboard.writeText(url);
        element.textContent = 'URL copied!';
    }

    saveToJSON(): void {
        const data: ExtendedEvent[] = this.eventService.getEvents()();
        const JSONData = data.map((data) => data.toJSON());
        const finalJSON: string = JSON.stringify(JSONData, null, 2);
        const blob = new Blob([finalJSON]);
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = 'itinerary.json';
        link.click(); //trigger download
        URL.revokeObjectURL(url);
    }

    saveToPng(): void {
        this.imageExportService.sendSig();
    }
}
