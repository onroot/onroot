import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { EventsService } from '../events.service';
import { Event } from '../shared/models/event';

@Component({
    selector: 'app-cards',
    standalone: true,
    imports: [CardComponent],
    templateUrl: './cards.component.html',
    styleUrl: './cards.component.css',
})
export class CardsComponent {
    eventsSig = this.eventsService.getEvents();

    constructor(private eventsService: EventsService) {}

    updateEvent(index: number, event: Event): void {
        this.eventsService.setEvent(index, event);
    }
}
