import { Injectable, Signal, computed, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ImageExportService {
    private exportSig = signal<'initial' | ''>('initial');

    getSig(): Signal<{}> {
        return computed(() => this.exportSig());
    }

    sendSig(): void {
        this.exportSig.set('');
    }
}
