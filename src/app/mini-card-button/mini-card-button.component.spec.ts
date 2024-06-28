import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniCardButtonComponent } from './mini-card-button.component';

describe('MiniCardButtonComponent', () => {
    let component: MiniCardButtonComponent;
    let fixture: ComponentFixture<MiniCardButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MiniCardButtonComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MiniCardButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
