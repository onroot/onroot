import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    viewChild,
} from '@angular/core';
import { Event, EventMember } from '../shared/models/event';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FormsModule } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { DateTime } from 'luxon';
import { NgClass } from '@angular/common';
import { CardEditBtnComponent } from '../card-edit-btn/card-edit-btn.component';
import {
    AnimationTriggerMetadata,
    animate,
    keyframes,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [
        NgxMaterialTimepickerModule,
        FormsModule,
        CdkTextareaAutosize,
        NgClass,
        CardEditBtnComponent,
    ],
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
    animations: [
        trigger('firstFocusClick', [
            state('unfocused', style({})),
            state('focused', style({})),
            transition('unfocused => focused', [
                animate(
                    '0.2s',
                    keyframes([
                        style({ transform: 'scale(1)' }),
                        style({ transform: 'scale(0.98)' }),
                        style({ transform: 'scale(1)' }),
                    ]),
                ),
            ]),
        ]),
        slideIn('slideIn0delay', '0ms'),
        slideIn('slideIn50delay', '50ms'),
        slideIn('slideIn100delay', '100ms'),
    ],
})
export class CardComponent implements OnInit {
    @Input({ required: true }) event!: Event;
    @Output() updateEvent = new EventEmitter<Event>();

    parentElement = viewChild<ElementRef>('parent');
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

    onFocusOut(event: FocusEvent): void {
        const relatedTarget = event.relatedTarget as HTMLElement | null;
        if (relatedTarget && this.parentElement()?.nativeElement.contains(relatedTarget)) {
            return;
        }

        this.isLocked = true;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

function slideIn(name: string, delay: string): AnimationTriggerMetadata {
    return trigger(name, [
        state(
            'hidden',
            style({
                visibility: 'hidden',
                transform: 'translateX(-15em)',
            }),
        ),
        state(
            'unhidden',
            style({
                visibility: 'visible',
                transform: 'translateX(0)',
            }),
        ),
        transition('hidden => unhidden', animate('0.4s ' + delay + ' ease-in-out')),
        transition('unhidden => hidden', animate('0.4s ease-in-out')),
    ]);
}
