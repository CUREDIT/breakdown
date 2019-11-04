import { Component } from '@angular/core';
@Component({
  selector: 'curemedit-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isRecording = true;

  toggleRecording() {
    this.isRecording = !this.isRecording;
  }
}
