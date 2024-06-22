import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event, EventMember } from '../shared/models/event';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FormsModule } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { DateTime } from 'luxon';
import { EventsService } from '../events.service';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [NgxMaterialTimepickerModule, FormsModule, CdkTextareaAutosize, NgClass],
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
    @Input({ required: true }) event!: Event;
    @Output() updateEvent = new EventEmitter<Event>();

    isLocked = true;
    eventMemberType = EventMember;

    ngOnInit(): void {
        console.log('created card!');
    }

    getTitle(): string {
        return this.event.title;
    }

    getTime(time: number | null): string {
        if (time === null) return '';
        return DateTime.fromSeconds(time).toLocaleString(DateTime.TIME_SIMPLE);
    }

    onFocusIn(): void {
        this.isLocked = false;
    }

    onBlur(): void {
        this.isLocked =true;
    }

    onChange(eventMemberType: EventMember, patch: any): void {
        this.updateEvent.emit(Event.withPatch(this.event, patch, eventMemberType));
    }

    onTimeChange(eventMemberType: EventMember, time: string) {
        const unixIntegers = DateTime.fromFormat(time, 't').toUnixInteger();
        console.log(unixIntegers);

        switch (eventMemberType) {
            case EventMember.startTime:
            case EventMember.endTime:
                this.updateEvent.emit(Event.withPatch(this.event, unixIntegers, eventMemberType));
                break;
            default:
                break;
        }
        return;
    }
}
