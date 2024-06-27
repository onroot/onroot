import { Component, Input, Signal } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { EventsService } from '../events.service';
import { ExtendedEvent, SimpleEvent } from '../shared/models/event';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { CommuteWidgetComponent } from '../commute-widget/commute-widget.component';
import { NgClass } from '@angular/common';
import { MiniCardButtonComponent } from '../mini-card-button/mini-card-button.component';

@Component({
    selector: 'app-cards-list',
    standalone: true,
    imports: [
        CardComponent,
        DragDropModule,
        CommuteWidgetComponent,
        NgClass,
        MiniCardButtonComponent,
    ],
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

    deleteEvent(index: number): void {
        this.eventsService.removeEvent(index);
    }

    drop(event: CdkDragDrop<ExtendedEvent[], ExtendedEvent>) {
        this.eventsService.moveEvent(event.previousIndex, event.currentIndex);
    }

    showCommute = true;
    onDragStart(): void {
        this.showCommute = false;
    }

    onDragEnd(): void {
        this.showCommute = true;
    }

    onNewCardBtnClick(): void {
        this.eventsService.addSimpleEvent(new SimpleEvent({}));
    }

    onReturnToFirstEventBtnClick(event: ExtendedEvent): void {
        this.eventsService.addEvent(event.clone());
    }
}
