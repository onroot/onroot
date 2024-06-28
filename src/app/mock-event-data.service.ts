import { Injectable } from '@angular/core';
import qs from 'qs';
import { SimpleEvent, UrlExportableEvent } from './shared/models/event';

@Injectable({
    providedIn: 'root',
})
export class MockEventDataService {
    private events: { '0': UrlExportableEvent[] } = {
        '0': [
            // {
            //     t: 'Tower of Pisa',
            //     l: 'ChIJzYhOxKaR1RIRA_xU1bGp7DI ',
            //     p: 'Tower of Pisa, Piazza del Duomo, Pisa, Province of Pisa, Italy',
            //     s: 1719016200,
            //     e: 1719452866,
            //     i: 'https://s1.bwallpapers.com/wallpapers/2014/05/29/leaning-tower-of-pisa_121750831.jpg',
            //     n: 'Notes on Italy',
            // },
            // {
            //     t: "Noah's Ark",
            //     l: 'GhIJQWDl0CIeQUARxks3icF8U8A',
            //     p: 'Ocean',
            //     s: 1719452887,
            //     e: 1719016200,
            //     i: 'https://www.empirecovers.ca/images/thumbs/0008503_triton-mooring-boat-cover.jpeg',
            //     n: 'Notes on the Ark',
            // },
            // {
            //     t: 'Null stuffs',
            //     l: null,
            //     p: null,
            //     s: null,
            //     e: null,
            //     i: null,
            //     n: null,
            // },
            new SimpleEvent({ title: 'firstTitle', placeId: 'firstPlace' }).toUrlExportableEvent(),
            new SimpleEvent({
                title: 'secondTitle',
                placeId: 'secondPlace',
            }).toUrlExportableEvent(),
            // new SimpleEvent({ title: 'c', placeId: 'c' }).toUrlExportableEvent(),
            // new SimpleEvent({ title: 'd', placeId: 'd' }).toUrlExportableEvent(),
            // new SimpleEvent({ title: 'e', placeId: 'e' }).toUrlExportableEvent(),
        ],
    };

    asRaw() {
        return this.events;
    }

    asArr() {
        return this.events['0'];
    }

    asObj() {
        const str = qs.stringify(this.events, { allowDots: true, skipNulls: true });
        console.log(str);
        return { events: str };
    }
}
