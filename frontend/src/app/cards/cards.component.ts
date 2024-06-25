import { Component, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { EventsService } from '../events.service';
import { ExtendedEvent } from '../shared/models/event';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-cards',
    standalone: true,
    imports: [CardComponent, DragDropModule],
    templateUrl: './cards.component.html',
    styleUrl: './cards.component.css',
})
export class CardsComponent {
    @Input({ required: true }) globalLock!: boolean;
    eventsSig = this.eventsService.getEvents();

    constructor(private eventsService: EventsService) {}

    updateEvent(index: number, event: ExtendedEvent): void {
        this.eventsService.setEvent(index, event);
    }

    drop(event: CdkDragDrop<ExtendedEvent[], ExtendedEvent>) {
        this.eventsService.moveEvent(event.previousIndex, event.currentIndex);
    }
}
