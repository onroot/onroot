import { Component, Input, Signal } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { EventsService } from '../events.service';
import { ExtendedEvent } from '../shared/models/event';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { CommuteWidgetComponent } from '../commute-widget/commute-widget.component';
import { UpperCasePipe } from '@angular/common';

@Component({
    selector: 'app-cards-list',
    standalone: true,
    imports: [CardComponent, DragDropModule, CommuteWidgetComponent, UpperCasePipe],
    templateUrl: './cards-list.component.html',
    styleUrl: './cards-list.component.css',
})
export class CardsListComponent {
    @Input({ required: true }) globalLock!: boolean;
    eventsSig = this.eventsService.getEvents();

    constructor(private eventsService: EventsService) {}

    getEvent(index: number): Signal<ExtendedEvent> {
        console.log('get event');

        return this.eventsService.getEvent(index);
    }

    updateEvent(index: number, event: ExtendedEvent): void {
        this.eventsService.setEvent(index, event);
    }

    drop(event: CdkDragDrop<ExtendedEvent[], ExtendedEvent>) {
        this.eventsService.moveEvent(event.previousIndex, event.currentIndex);
    }
}
