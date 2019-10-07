import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  AfterContentInit
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Simulation } from '../../../models/simulation.model';
import { XY } from '../../../typings/graph';
import { SimApiService } from '../../../shared/api/graph-api.service';
import { D3GraphService } from '../../../shared/d3/d3-graph.service';
import { D3SimService } from '../../../shared/d3/d3-sim.service';
import { GraphData } from 'src/app/typings/graphData';
import { DataSet, Edge, Node } from 'vis';
import { isRefNode } from 'src/app/models/edge.model';

@Component({
  selector: 'curedit-network-view',
  templateUrl: './network-view.component.html',
  styleUrls: ['./network-view.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class NetworkViewComponent implements AfterContentInit, OnDestroy {
  sim$: BehaviorSubject<Simulation> = new BehaviorSubject<Simulation>(null);
  private tickerSubscription: Subscription;

  defaultDim = '100%';
  simAxes: XY;
  editorCoords: XY;

  graphData: GraphData = { nodes: null, edges: null };

  @ViewChild('networkContainer', { static: true }) networkContainer: ElementRef;

  constructor(
    private d3Sim: D3SimService,
    private d3Graph: D3GraphService,
    private simApi: SimApiService,
    private changeRef: ChangeDetectorRef
  ) {}

  // @HostListener('window:resize', ['$event'])
  // onResize() {
  //   const { width, height } = this.networkContainer.nativeElement.getBoundingClientRect();
  //   this.simAxes = { x: width, y: height };
  //   const simulation = this.sim$.getValue();
  //   if (simulation) {
  //     simulation.init(this.simAxes);
  //   }
  // }

  ngAfterContentInit() {
    // create an array with nodes
    const nodes = new DataSet([
      { id: 1, label: 'Node 1' },
      { id: 2, label: 'Node 2' },
      { id: 3, label: 'Node 3' },
      { id: 4, label: 'Node 4' },
      { id: 5, label: 'Node 5' }
    ]);

    // create an array with edges
    const edges = new DataSet([
      { from: 1, to: 3 },
      { from: 1, to: 2 },
      { from: 2, to: 4 },
      { from: 2, to: 5 }
    ]);
    this.graphData = { nodes, edges };

    this.simAxes = { x: window.outerWidth / 1.2, y: window.outerHeight / 1.5 };
    this.simApi.getGraphs().subscribe(gArr => {
      // const sim = this.d3Sim.startSimulation(this.d3Graph.graph, this.simAxes);
      // this.tickerSubscription = sim.ticker.subscribe(_ => this.changeRef.markForCheck());
      // this.sim$.next(sim);
      gArr.forEach(g => {
        this.graphData.nodes = new DataSet<Node>(
          g.nodes.map(n => ({ id: n.id, label: n.label }))
        );
        this.graphData.edges = new DataSet<Edge>(
          g.edges.map(e => ({
            from: isRefNode(e.source) ? e.source.id : e.source.toString(),
            to: isRefNode(e.target) ? e.target.id : e.target.toString()
          }))
        );
        // this.changeRef.markForCheck();
        console.log('graphData', this.graphData);
      });
    });
  }

  ngOnDestroy() {
    this.tickerSubscription.unsubscribe();
    this.d3Sim.stopSimulation();
  }

  getEditor(coords: XY) {
    this.editorCoords = coords;
  }
}
