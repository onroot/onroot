import { Component, Input } from '@angular/core';
import { Event } from '../shared/models/event';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [NgxMaterialTimepickerModule],
    templateUrl: './card.component.html',
    styleUrl: './card.component.css'
})
export class CardComponent {
    @Input({ required: true }) event!: Event;
}
