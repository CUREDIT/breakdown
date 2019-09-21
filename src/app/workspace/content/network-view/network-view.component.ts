import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { Simulation } from '../../../models/simulation.model';
import { XY } from '../../../models/types/graph';
import { D3SimService } from '../../../shared/d3/d3-sim.service';
import { SimApiService } from '../../../shared/mock-backend/sim-api.service';
import { D3GraphService } from '../../../shared/d3/d3-graph.service';

@Component({
  selector: 'curedit-network-view',
  templateUrl: './network-view.component.html',
  styleUrls: ['./network-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NetworkViewComponent implements OnInit, OnDestroy, AfterViewInit {

  sim$: BehaviorSubject<Simulation> = new BehaviorSubject<Simulation>(null);
  private tickerSubscription: Subscription;

  defaultDim = '100%';
  simAxes: XY;
  editorCoords: XY;

  @ViewChild('networkContainer', { static: false }) networkContainer: ElementRef;

  constructor(
    private d3Sim: D3SimService,
    private d3Graph: D3GraphService,
    private simApi: SimApiService,
    private changeRef: ChangeDetectorRef) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const { width, height } = this.networkContainer.nativeElement.getBoundingClientRect();
    console.log('networkContainer dims resize', width, height);
    this.simAxes = { x: width, y: height };
    const simulation = this.sim$.getValue();
    if (simulation) {
      simulation.init(this.simAxes);
    }
    console.log('sim$', simulation, this.simAxes);
  }

  ngOnInit() {
    this.simAxes = { x: window.outerWidth, y: window.outerHeight / 2 };
    this.simApi.getGraphs()
      .subscribe(g => {
        const sim = this.d3Sim.startSimulation(this.d3Graph.graph, this.simAxes);
        this.tickerSubscription = sim.ticker.subscribe(_ => this.changeRef.markForCheck());
        this.sim$.next(sim);
        console.log('get graphs', sim, this.sim$);
      });
    console.log('init simaxes', this.simAxes);
  }

  ngAfterViewInit() {
    const { width, height } = this.networkContainer.nativeElement.getBoundingClientRect();
    console.log('network dims', this.networkContainer.nativeElement.getBoundingClientRect());
  }

  ngOnDestroy() {
    this.tickerSubscription.unsubscribe();
  }

  getEditor(coords: XY) {
    this.editorCoords = coords;
  }

}
