import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-card-edit-btn',
    standalone: true,
    imports: [],
    templateUrl: './card-edit-btn.component.html',
    styleUrl: './card-edit-btn.component.css',
})
export class CardEditBtnComponent {
    @Input({ required: true }) text!: string;
}
