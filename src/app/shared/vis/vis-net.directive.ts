import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { GraphData } from 'src/app/typings/graphData';
import { Network, Options } from 'vis';

@Directive({
  selector: '[cureditVisNet]'
})
export class VisNetDirective implements OnInit {
  private network: Network;
  private graphData: GraphData;
  private optionS: Options;

  constructor(private el: ElementRef) {}

  get options() {
    return (
      this.optionS || {
        nodes: {
          shape: 'dot',
          size: 30,
          font: {
            size: 32
          },
          borderWidth: 2,
          shadow: true
        },
        edges: {
          width: 2,
          shadow: true,
          smooth: {
            enabled: true,
            roundness: 0.5,
            type: 'cubicBezier',
            forceDirection: 'vertical'
          }
        },
        physics: {
          forceAtlas2Based: {
            avoidOverlap: 0.25,
            gravitationalConstant: -95,
            centralGravity: 0.01,
            springLength: 100,
            springConstant: 0.19,
            nodeDistance: 175,
            damping: 0.11
          },
          minVelocity: 0.75,
          solver: 'forceAtlas2Based'
        }
      }
    );
  }

  @Input() set options(options: Options) {
    this.optionS = options;
  }

  @Input() set cureditVisNet(graphData: GraphData) {
    console.log('cureditVisNet', graphData);
    this.graphData = graphData;
  }

  ngOnInit() {
    if (!this.network) {
      this.network = new Network(
        this.el.nativeElement,
        this.graphData,
        this.options
      );
      console.log('network', this.network, this.graphData);
    }
  }
}
