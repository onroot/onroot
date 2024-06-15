import { Component, ElementRef, ViewChild } from '@angular/core';
import * as htmlToImage from 'html-to-image';

@Component({
    selector: 'app-example-to-img',
    standalone: true,
    imports: [],
    templateUrl: './example-to-img.component.html',
    styleUrl: './example-to-img.component.css'
})
export class ExampleToImgComponent {
  @ViewChild('targetToDownload', { static: false }) content!: ElementRef;

  takeScreenshot() {
      const element = this.content.nativeElement;

      htmlToImage.toPng(element)
          .then(function (dataUrl) {
              const link = document.createElement('a');
              link.href = dataUrl;
              link.download = 'canvas-image.png';
              link.click();
          });
  }
}
