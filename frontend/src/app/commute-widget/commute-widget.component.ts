import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-commute-widget',
    standalone: true,
    imports: [],
    templateUrl: './commute-widget.component.html',
    styleUrl: './commute-widget.component.css',
})
export class CommuteWidgetComponent {
    @Input({ required: true }) commuteContext!: {
        originId: string | null;
        destinationId: string | null;
        originDepartureTime: number | null;
        destinationArrivalTime: number | null;
    };
}
