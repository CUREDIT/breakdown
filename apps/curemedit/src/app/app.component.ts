import { Component } from '@angular/core';
import { faPauseCircle, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'curemedit-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isRecording = false;

  faStepBackward = faStepBackward;
  // faRecordVinyl = faRecordVinyl;
  faPauseCircle = faPauseCircle;
  faStepForward = faStepForward;
}
