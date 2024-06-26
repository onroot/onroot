import { Component } from '@angular/core';

@Component({
  selector: 'app-save-page',
  standalone: true,
  templateUrl: './save-page.component.html',
  styleUrl: './save-page.component.css'
})
export class SavePageComponent {

    copyURL(element: HTMLElement):void{
        const currentUrl = window.location.href;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(currentUrl)
              .then(() => {
                element.textContent = 'URL Copied!';
              })
              .catch((err) => {
                console.error('Failed to copy URL: ', err);
              });
          }
    }

    saveURLToJSON(): void {
        const currentUrl = window.location.href;
        const data = {
          url: currentUrl
        };
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'url.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

}
