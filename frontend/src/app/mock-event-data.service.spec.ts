import { TestBed } from '@angular/core/testing';

import { MockEventDataService } from './mock-event-data.service';

describe('MockEventDataService', () => {
    let service: MockEventDataService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MockEventDataService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
