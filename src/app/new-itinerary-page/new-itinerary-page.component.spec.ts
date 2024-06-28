import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewItineraryPageComponent } from './new-itinerary-page.component';
import { RouterModule } from '@angular/router';

describe('NewItineraryPageComponent', () => {
    let component: NewItineraryPageComponent;
    let fixture: ComponentFixture<NewItineraryPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NewItineraryPageComponent, RouterModule.forRoot([])],
        }).compileComponents();

        fixture = TestBed.createComponent(NewItineraryPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
