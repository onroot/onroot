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
import { debounce } from 'lodash';
import { MapsService } from '../maps.service';
import { PlaceSuggestionsComponent } from '../place-suggestions/place-suggestions.component';
import { Place } from '../shared/models/place';

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
        PlaceSuggestionsComponent,
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
    @Output() deleteEvent = new EventEmitter<void>();

    parentElement = viewChild<ElementRef>('parent');
    isLocked = true; //temp false
    explicitShowTime = false;

    constructor(private mapsService: MapsService) {}

    onFocusIn(): void {
        if (this.globalLock) return;
        this.isLocked = false;
    }

    onFocusOut(relatedTarget: EventTarget | null): void {
        if (relatedTarget && this.parentElement()?.nativeElement.contains(relatedTarget)) {
            return;
        }

        this.showImgUrlInput = false;
        this.isLocked = true;
    }

    onLocationBtnClick(): void {
        const placeName = this.event.placeName === null ? '' : null;
        this.updateEvent.emit(
            this.event.clone().update({ placeId: null, placeName, placeRouteUrl: null }),
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

    onDeleteBtnClick(): void {
        this.deleteEvent.emit();
    }

    showPlaceSuggestions = false;
    placeSuggestions: Place[] = [];
    onLocationFieldChange(placeName: string): void {
        this.debounceOnLocationFieldChange(placeName);
    }

    private debounceOnLocationFieldChange = debounce(async (placeName: string) => {
        this.updateEvent.emit(
            this.event.clone().update({ placeId: null, placeName, placeRouteUrl: null }),
        );
        if (placeName === '') return;

        const places = await this.mapsService.fetchPlaceResults(placeName);
        this.placeSuggestions = places;
        this.showPlaceSuggestions = true;
    }, 500);

    suggestionsElement = viewChild<ElementRef>('suggestions');
    onLocationFieldBlur(relatedTarget: EventTarget | null): void {
        if (relatedTarget === this.suggestionsElement()?.nativeElement) {
            return;
        }
        this.showPlaceSuggestions = false;
    }

    onSuggestionClick({ placeId, placeName }: Place): void {
        const placeRouteUrl = this.mapsService.generateDirectionsUrl({ placeId, placeName });
        this.updateEvent.emit(this.event.clone().update({ placeId, placeName, placeRouteUrl }));
        this.showPlaceSuggestions = false;
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
