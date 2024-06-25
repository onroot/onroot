import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEditBtnComponent } from './card-edit-btn.component';

describe('CardEditBtnComponent', () => {
    let component: CardEditBtnComponent;
    let fixture: ComponentFixture<CardEditBtnComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CardEditBtnComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CardEditBtnComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
