import { Injectable } from '@angular/core';
import qs from 'qs';
import { UrlExportableEvent, SimpleEvent } from './shared/models/event';

@Injectable({
    providedIn: 'root',
})
export class MockEventDataService {
    private events: { '0': UrlExportableEvent[] } = {
        '0': [
            {
                t: 'Leaning Tower of Pisa',
                l: '12345',
                p: 'Rome, Italy',
                s: 720,
                e: 750,
                i: '',
                n: 'Notes on Italy',
            },
            {
                t: "Noah's Ark",
                l: '54321',
                p: 'Ocean',
                s: 600,
                e: 610,
                i: '',
                n: 'Notes on the Ark',
            },
        ],
    };

    asRaw() {
        return this.events;
    }

    asArr() {
        return this.events['0'];
    }

    asObj() {
        const str = qs.stringify(this.events, { allowDots: true });
        return { events: str };
    }
}
