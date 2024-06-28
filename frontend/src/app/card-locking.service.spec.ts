import { TestBed } from '@angular/core/testing';

import { CardLockingService } from './card-locking.service';

describe('CardLockingService', () => {
    let service: CardLockingService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CardLockingService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
