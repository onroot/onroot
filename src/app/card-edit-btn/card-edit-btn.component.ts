import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-card-edit-btn',
    standalone: true,
    imports: [NgClass],
    templateUrl: './card-edit-btn.component.html',
    styleUrl: './card-edit-btn.component.css',
})
export class CardEditBtnComponent {
    @Input({ required: true }) label!: string;
    @Input({ required: true }) addOrRemove!: 'Add' | 'Remove';
}
