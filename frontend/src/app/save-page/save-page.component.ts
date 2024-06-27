import { Component } from '@angular/core';
import { EventsService } from '../events.service';
import { ExtendedEvent, SimpleEvent, UrlExportableEvent } from '../shared/models/event';
import qs from 'qs';

@Component({
  selector: 'app-save-page',
  standalone: true,
  templateUrl: './save-page.component.html',
  styleUrl: './save-page.component.css'
})
export class SavePageComponent {

    constructor(private eventService : EventsService){

    }

    copyURL(element: HTMLElement):void{
        const data: ExtendedEvent[] = this.eventService.getEvents()();
        const URLData: UrlExportableEvent[] = data.map((data) => data.toUrlExportableEvent());
        const URLString: string = qs.stringify(URLData);

        const hostname: string = window.location.hostname;
        const temp: string = "/create?events="
        const URL: string = hostname.concat(temp.concat(URLString));
        navigator.clipboard.writeText(URL);
        element.textContent = "URL copied!";
    }

    saveToJSON(): void {
        const data: ExtendedEvent[] = this.eventService.getEvents()();
        const JSONData = data.map((data) => data.toJSON());
        const finalJSON: string = JSON.stringify(JSONData);
        console.log(finalJSON);
        const blob = new Blob([finalJSON]);
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = 'itinerary.json';
        document.body.appendChild(link);
        link.click(); //trigger download
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

      }



}
