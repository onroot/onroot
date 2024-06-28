import { Component, OnInit } from '@angular/core';
import { CardsListComponent } from '../cards-list/cards-list.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UrlExportableEvent, UrlExportableEventSchema } from '../shared/models/event';
import { EventsService } from '../events.service';
import qs from 'qs';

@Component({
    selector: 'app-create-page',
    standalone: true,
    imports: [CardsListComponent, RouterLink],
    templateUrl: './create-page.component.html',
    styleUrl: './create-page.component.css',
})
export class CreatePageComponent implements OnInit {
    constructor(
        private eventsService: EventsService,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.consumeParamEvents();
    }

    consumeParamEvents() {
        // Get data from URL
        const queryEvents = this.route.snapshot.queryParamMap.get('events');
        console.log('Consuming URL...', queryEvents);

        // Clear data from URL
        this.router.navigate([], { queryParams: { events: null }, queryParamsHandling: 'merge' });
        if (queryEvents === null) {
            console.log('No events key');
            return;
        }

        // Validate data
        const parsedQueryEvents = qs.parse(queryEvents, { allowDots: true, arrayLimit: 100 })[
            '0'
        ] as unknown[];
        console.log(parsedQueryEvents);

        const validatedEvents = UrlExportableEventSchema.array().safeParse(parsedQueryEvents);
        if (validatedEvents.data === undefined) {
            console.error('Malformed event data');
            console.log(validatedEvents.error.cause);

            return;
        }

        // Add events
        validatedEvents.data.map((event: UrlExportableEvent) =>
            this.eventsService.addUrlExportableEvent(event),
        );
    }
}
