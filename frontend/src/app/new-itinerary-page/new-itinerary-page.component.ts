import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-new-itinerary-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './new-itinerary-page.component.html',
  styleUrl: './new-itinerary-page.component.css'
})
export class NewItineraryPageComponent {

    triggerFileInput(): void {
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        fileInput.click();
      }

    loadURLFromJSON(event: Event): void {
        const input = event.target as HTMLInputElement;

        if (input.files && input.files[0]) {
          const file = input.files[0];
          const reader = new FileReader();

          reader.onload = (e) => {
            try {
              const json = JSON.parse(e.target!.result as string);
              if (json.url) {
                window.location.href = json.url;
              } else {
                console.error('Invalid JSON file: URL not found');
              }
            } catch (err) {
              console.error('Failed to parse JSON file', err);
            }
          };

          reader.readAsText(file);
        }
    }
}
