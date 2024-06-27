import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Place } from '../shared/models/place';

@Component({
    selector: 'app-place-suggestions',
    standalone: true,
    imports: [],
    templateUrl: './place-suggestions.component.html',
    styleUrl: './place-suggestions.component.css',
})
export class PlaceSuggestionsComponent {
    @Input({ required: true }) places!: Place[];
    @Output() suggestionClick = new EventEmitter<Place>();
}
