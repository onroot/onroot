import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    UrlExportableEventSchema,
    Event,
    SimpleEvent,
} from '../shared/models/event';
import qs from 'qs';
import { MockEventDataService } from '../mock-event-data.service';
import { CardComponent } from '../card/card.component';

@Component({
    selector: 'app-cards',
    standalone: true,
    imports: [CardComponent],
    templateUrl: './cards.component.html',
    styleUrl: './cards.component.css',
})
export class CardsComponent implements OnInit {
    newId: number = 0;
    events: Event[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private mockData: MockEventDataService,
    ) {}

    ngOnInit() {
        // this.consumeParamEvents();
        this.mockData
            .asArr()
            .map(SimpleEvent.fromUrlExportableEvent)
            .map((event: SimpleEvent) => this.addEvent(event));
    }

    consumeParamEvents() {
        const queryEvents = this.route.snapshot.queryParamMap.get('events');
        this.router.navigate([], { queryParams: { events: null }, queryParamsHandling: 'merge' });
        if (queryEvents === null) return;

        const parsedQueryEvents = qs.parse(queryEvents, { allowDots: true })['0'] as unknown[];
        const validatedEvents = UrlExportableEventSchema.array().safeParse(parsedQueryEvents);
        if (validatedEvents.data === undefined) return;

        validatedEvents.data
            .map(SimpleEvent.fromUrlExportableEvent)
            .map((event: SimpleEvent) => this.addEvent(event));
    }

    addEvent(e: SimpleEvent) {
        const event = new Event(e, ++this.newId, 'https://example.com');
        this.events.push(event);
    }
}
