import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { eventSchema, Event } from '../shared/models/event';
import qs from 'qs';
import { MockEventDataService } from '../mock-event-data.service';
import { CardComponent } from '../card/card.component';

@Component({
    selector: 'app-cards',
    standalone: true,
    imports: [CardComponent],
    templateUrl: './cards.component.html',
    styleUrl: './cards.component.css'
})
export class CardsComponent implements OnInit {
    events: Event[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private mockData: MockEventDataService
    ) { }

    ngOnInit() {
        // this.events = this.consumeParamEvents();
        this.events = this.mockData.asArr();
    }

    consumeParamEvents(): Event[] {
        const queryEvents = this.route.snapshot.queryParamMap.get('events');
        this.router.navigate([], { queryParams: { events: null }, queryParamsHandling: 'merge' })
        if (queryEvents === null) {
            return [];
        }

        const parsedQueryEvents = qs.parse(queryEvents, { comma: true, allowDots: true })['0'] as unknown[];
        const validatedEvents = eventSchema.array().safeParse(parsedQueryEvents);
        console.log(validatedEvents);

        return validatedEvents.data !== undefined
            ? validatedEvents.data
            : [];
    }
}
