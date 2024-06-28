import { Injectable, Signal, computed, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CardLockingService {
    private isLockedSig = signal<boolean>(false);

    isLocked(): Signal<boolean> {
        return computed(() => this.isLockedSig());
    }

    toggleLockCards(): void {
        this.isLockedSig.update((prevValue) => !prevValue);
    }

    lockCards(): void {
        this.isLockedSig.set(true);
    }

    unlockCards(): void {
        this.isLockedSig.set(false);
    }
}
