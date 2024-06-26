import { Component, OnInit } from '@angular/core';
import { CardsListComponent } from '../cards-list/cards-list.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MockEventDataService } from '../mock-event-data.service';
import { UrlExportableEvent, UrlExportableEventSchema } from '../shared/models/event';
import { EventsService } from '../events.service';
import qs from 'qs';
import { MapsService } from '../maps.service';
import { DateTime } from 'luxon';

@Component({
    selector: 'app-create-page',
    standalone: true,
    imports: [CardsListComponent, RouterLink],
    templateUrl: './create-page.component.html',
    styleUrl: './create-page.component.css',
})
export class CreatePageComponent implements OnInit {
    globalLock = false;

    constructor(
        private eventsService: EventsService,
        private route: ActivatedRoute,
        private router: Router,
        private mockEventData: MockEventDataService,
        private mapService: MapsService
    ) {}

    ngOnInit(): void {
        // this.consumeParamEvents();
        this.mapService.fetchPlaceResults("niagra").then(()=>{});
        this.mapService.fetchEstimatedTravel("ChIJW6AIkVXemwARTtIvZ2xC3FA", "ChIJ9dtpbgeoXZQRyTYZv0Z666w", DateTime.fromSeconds(1719016200).toJSDate() ).then(()=>{});
        // add mock data for now
        this.mockEventData.asArr().map((e) => this.eventsService.addUrlExportableEvent(e));
    }

    toggleLock(): void {
        this.globalLock = !this.globalLock;
    }

    // mock function to add events. page needs to be reloaded as well.
    pushQs() {
        this.router.navigate([], { queryParams: this.mockEventData.asObj() });
    }

    consumeParamEvents() {
        // Get data from URL
        const queryEvents = this.route.snapshot.queryParamMap.get('events');
        // Clear data from URL
        this.router.navigate([], { queryParams: { events: null }, queryParamsHandling: 'merge' });
        if (queryEvents === null) return;

        // Validate data
        const parsedQueryEvents = qs.parse(queryEvents, { allowDots: true })['0'] as unknown[];
        const validatedEvents = UrlExportableEventSchema.array().safeParse(parsedQueryEvents);
        if (validatedEvents.data === undefined) return;

        // Add events
        validatedEvents.data.map((event: UrlExportableEvent) =>
            this.eventsService.addUrlExportableEvent(event),
        );
    }
}
