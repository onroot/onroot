import { Component, ElementRef, EventEmitter, Input, Output, viewChild } from '@angular/core';
import { ExtendedEvent } from '../shared/models/event';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FormsModule } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { DateTime } from 'luxon';
import { NgClass } from '@angular/common';
import { CardEditBtnComponent } from '../card-edit-btn/card-edit-btn.component';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { TimeStrPipe } from '../time-str.pipe';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [
        NgxMaterialTimepickerModule,
        FormsModule,
        CdkTextareaAutosize,
        NgClass,
        CardEditBtnComponent,
        TimeStrPipe,
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
        trigger('slideIn', [
            state(
                'hidden',
                style({
                    visibility: 'hidden',
                    transform: 'translateX(-15em)',
                    transformOrigin: '-15em -1em',
                    scale: '0',
                }),
            ),
            state(
                'unhidden',
                style({
                    visibility: 'visible',
                    transform: 'translateX(0)',
                    scale: '1',
                }),
            ),
            transition('hidden => unhidden', animate('0.4s {{ delay }} ease-in-out'), {
                params: {
                    delay: '0s',
                },
            }),
            transition('unhidden => hidden', animate('0.4s ease-in-out')),
        ]),
    ],
})
export class CardComponent {
    @Input({ required: true }) event!: ExtendedEvent;
    @Input({ required: true }) globalLock!: boolean;
    @Output() updateEvent = new EventEmitter<ExtendedEvent>();

    parentElement = viewChild<ElementRef>('parent');
    isLocked = false; //temp false

    private explicitShowTime = false;
    showTime(): boolean {
        return (
            this.event.startTime !== null || this.event.endTime !== null || this.explicitShowTime
        );
    }

    onFocusIn(): void {
        if (this.globalLock) return;
        this.isLocked = false;
    }

    onFocusOut(event: FocusEvent | null): void {
        const relatedTarget = event?.relatedTarget as HTMLElement | null;
        if (relatedTarget && this.parentElement()?.nativeElement.contains(relatedTarget)) {
            return;
        }

        this.showImgUrlInput = false;
        this.isLocked = true;
    }

    onLocationBtnClick(): void {
        const patch = this.event.placeName === null ? '' : null;
        this.updateEvent.emit(
            this.event.clone().update({ placeId: patch, placeName: patch, placeRouteUrl: patch }),
        );
    }

    onTimeBtnClick(): void {
        // Hide and clear times
        if (this.event.startTime !== null || this.event.endTime !== null) {
            this.updateEvent.emit(this.event.clone().update({ startTime: null, endTime: null }));
            this.explicitShowTime = false;
            // Show times
        } else {
            this.explicitShowTime = !this.explicitShowTime;
        }
    }

    onImgBtnClick(): void {
        if (this.event.imgUrl !== null) {
            this.updateEvent.emit(this.event.clone().update({ imgUrl: null }));
        } else {
            this.showImgUrlInput = !this.showImgUrlInput;
        }
    }

    showImgUrlInput = false;
    onImageUrlSubmit(event: Event): void {
        const inputElement = event.target as HTMLInputElement | null;
        if (inputElement === null) return;

        const imgUrl = inputElement.value;
        this.updateEvent.emit(this.event.clone().update({ imgUrl }));

        this.showImgUrlInput = false;
        inputElement.value = '';
    }

    onNotesBtnClick(): void {
        const notes = this.event.notes === null ? '' : null;
        this.updateEvent.emit(this.event.clone().update({ notes }));
    }

    onTimeChange({
        startTime = this.event.startTime,
        endTime = this.event.endTime,
    }: {
        startTime?: string | number | null;
        endTime?: string | number | null;
    }) {
        if (typeof startTime === 'string') {
            startTime = DateTime.fromFormat(startTime, 't').toUnixInteger();
        }
        if (typeof endTime === 'string') {
            endTime = DateTime.fromFormat(endTime, 't').toUnixInteger();
        }

        this.updateEvent.emit(this.event.clone().update({ startTime, endTime }));
    }

    onInvisibleSpaceFocus(): void {
        this.onFocusOut(null);
    }
}
