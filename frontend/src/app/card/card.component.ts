import { Component, Input } from '@angular/core';
import { Event } from '../shared/models/event';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [],
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
})
export class CardComponent {
    @Input({ required: true }) event!: Event;
}
