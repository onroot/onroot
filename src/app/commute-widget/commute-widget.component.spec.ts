import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommuteWidgetComponent } from './commute-widget.component';

describe('CommuteWidgetComponent', () => {
    let component: CommuteWidgetComponent;
    let fixture: ComponentFixture<CommuteWidgetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommuteWidgetComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CommuteWidgetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
