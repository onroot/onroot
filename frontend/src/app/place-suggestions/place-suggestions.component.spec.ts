import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceSuggestionsComponent } from './place-suggestions.component';

describe('PlaceSuggestionsComponent', () => {
    let component: PlaceSuggestionsComponent;
    let fixture: ComponentFixture<PlaceSuggestionsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PlaceSuggestionsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PlaceSuggestionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
