import { AfterContentInit, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { NbWindowService, NbWindowRef, NbWindowState } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { SimApiService } from '../../../shared/api/graph-api.service';
import { VisService } from '../../../shared/vis/vis.service';
import { XY } from '../../../typings/graph';
import { EditorComponent } from '../../editor/editor.component';

@Component({
  selector: 'curedit-network-view',
  templateUrl: './network-view.component.html',
  styleUrls: ['./network-view.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class NetworkViewComponent implements AfterContentInit, OnDestroy {
  @ViewChild('networkContainer', { static: true }) networkContainer: ElementRef;

  private coordSub: Subscription;
  editorCoords: XY;
  private windowRef: NbWindowRef;

  constructor(
    private simApi: SimApiService,
    private visService: VisService,
    private windowService: NbWindowService
  ) {}

  @HostListener('window:resize', [])
  onResize() {
    this.fitToView();
  }

  fitToView() {
    this.visService.fitToView();
  }

  ngAfterContentInit() {
    this.simApi.getGraphs().subscribe(graphArr => {
      this.visService.updateNetwork(
        this.networkContainer.nativeElement,
        graphArr
      );
      this.coordSub = this.visService.nodeSelect().subscribe(e => {
        this.getEditor(e.pointer.DOM, e.nodes[0]);
      });
    });
  }

  ngOnDestroy() {
    if (this.coordSub) {
      this.coordSub.unsubscribe();
    }
  }

  getEditor(coords: XY, title: string) {
    const {
      top,
      left
    } = this.networkContainer.nativeElement.getBoundingClientRect();
    this.editorCoords = {
      x: coords.x + left,
      y: coords.y + top
    };
    this.windowRef = this.windowService.open(EditorComponent, {
      title: `Edit ${title}`,
      context: { coords: this.editorCoords, title },
      viewContainerRef: this.networkContainer.nativeElement
    });
    this.windowRef.onClose.subscribe(_ => this.visService.unselect());
  }
}
