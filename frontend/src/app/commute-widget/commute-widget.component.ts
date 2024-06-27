import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Commute } from '../shared/models/commute';
import { MapsService } from '../maps.service';
import { debounce } from 'lodash';

@Component({
    selector: 'app-commute-widget',
    standalone: true,
    imports: [],
    templateUrl: './commute-widget.component.html',
    styleUrl: './commute-widget.component.css',
})
export class CommuteWidgetComponent implements OnChanges {
    @Input({ required: true }) commuteContext!: Commute;

    estimatedTime: string | null = null;
    possible = true;

    constructor(private mapsService: MapsService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['commuteContext']) {
            this.onCommuteContextChange();
        }
    }

    onCommuteContextChange(): void {
        if (this.commuteContext.originDepartureTime < this.commuteContext.destinationArrivalTime) {
            //temp disabled
            // this.debouncedGetEstimatedTravelTime();
        } else {
            this.estimatedTime = null;
        }
    }

    private debouncedGetEstimatedTravelTime = debounce(async () => {
        const time = await this.mapsService.getEstimatedTravelTime(this.commuteContext);

        if (time === null) {
            this.estimatedTime = null;
            return;
        }

        this.estimatedTime = time.text;
        this.possible =
            this.commuteContext.originDepartureTime + time.value <=
            this.commuteContext.destinationArrivalTime;
    }, 1000);
}
