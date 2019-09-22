import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Simulation } from '../../../models/simulation.model';
import { XY } from '../../../models/typings/graph';
import { SimApiService } from '../../../shared/api/graph-api.service';
import { D3GraphService } from '../../../shared/d3/d3-graph.service';
import { D3SimService } from '../../../shared/d3/d3-sim.service';


@Component({
  selector: 'curedit-network-view',
  templateUrl: './network-view.component.html',
  styleUrls: ['./network-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NetworkViewComponent implements OnInit, OnDestroy {

  sim$: BehaviorSubject<Simulation> = new BehaviorSubject<Simulation>(null);
  private tickerSubscription: Subscription;

  defaultDim = '100%';
  simAxes: XY;
  editorCoords: XY;

  @ViewChild('networkContainer', { static: true }) networkContainer: ElementRef;

  constructor(
    private d3Sim: D3SimService,
    private d3Graph: D3GraphService,
    private simApi: SimApiService,
    private changeRef: ChangeDetectorRef) { }


  @HostListener('window:resize', ['$event'])
  onResize() {
    const { width, height } = this.networkContainer.nativeElement.getBoundingClientRect();
    this.simAxes = { x: width, y: height };
    const simulation = this.sim$.getValue();
    if (simulation) {
      simulation.init(this.simAxes);
    }
  }

  ngOnInit() {
    this.simAxes = { x: window.outerWidth / 1.2, y: window.outerHeight / 1.5 };
    this.simApi.getGraphs()
      .subscribe(g => {
        const sim = this.d3Sim.startSimulation(this.d3Graph.graph, this.simAxes);
        this.tickerSubscription = sim.ticker.subscribe(_ => this.changeRef.markForCheck());
        this.sim$.next(sim);
      });
  }

  ngOnDestroy() {
    this.tickerSubscription.unsubscribe();
  }

  getEditor(coords: XY) {
    this.editorCoords = coords;
  }

}
