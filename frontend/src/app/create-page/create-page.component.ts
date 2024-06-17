import { Component } from '@angular/core';
import { CardsComponent } from '../cards/cards.component';
import { Router, RouterLink } from '@angular/router';
import { MockEventDataService } from '../mock-event-data.service';

@Component({
    selector: 'app-create-page',
    standalone: true,
    imports: [CardsComponent, RouterLink],
    templateUrl: './create-page.component.html',
    styleUrl: './create-page.component.css'
})
export class CreatePageComponent {
    constructor(
        private router: Router,
        private mockEventData: MockEventDataService
    ) { }

    pushQs() {
        this.router.navigate([], { queryParams: this.mockEventData.asObj() })
    }
}
