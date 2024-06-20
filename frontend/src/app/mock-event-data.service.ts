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
                i: 'https://s1.bwallpapers.com/wallpapers/2014/05/29/leaning-tower-of-pisa_121750831.jpg',
                n: 'Notes on Italy',
            },
            {
                t: "Noah's Ark",
                l: '54321',
                p: 'Ocean',
                s: 600,
                e: 610,
                i: 'https://www.empirecovers.ca/images/thumbs/0008503_triton-mooring-boat-cover.jpeg',
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
