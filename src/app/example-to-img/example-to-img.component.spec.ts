import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleToImgComponent } from './example-to-img.component';

describe('ExampleToImgComponent', () => {
  let component: ExampleToImgComponent;
  let fixture: ComponentFixture<ExampleToImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleToImgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleToImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
