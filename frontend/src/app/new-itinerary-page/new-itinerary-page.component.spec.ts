import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewItineraryPageComponent } from './new-itinerary-page.component';

describe('NewItineraryPageComponent', () => {
    let component: NewItineraryPageComponent;
    let fixture: ComponentFixture<NewItineraryPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NewItineraryPageComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(NewItineraryPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
