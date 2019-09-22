import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Graph } from 'src/app/models/graph.model';
import { Node } from 'src/app/models/node.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryNetApiService implements InMemoryDbService {

  createDb() {
    const first = new Node('first'); // .setLinkCount(2);
    const second = new Node('second'); // .setLinkCount(2);
    const third = new Node('third'); // .setLinkCount(2);
    const last = new Node('last'); // .setLinkCount(3);
    const orphana = new Node('orphan-a'); // .setLinkCount(2);
    const orphanb = new Node('orphan-b'); // .setLinkCount(2);
    const orphanc = new Node('orphan-c'); // .setLinkCount(2);
    const orc = new Node('orc'); // .setLinkCount(1);
    const ord = new Node('ord'); // .setLinkCount(2);
    const ore = new Node('ore'); // .setLinkCount(3);
    const orf = new Node('orf'); // .setLinkCount(1);
    const graphs: Graph[] = [
      new Graph(
        [
          first,
          second,
          third,
          last,
          orphana,
          orphanb,
          orphanc,
          orc,
          ord,
          ore,
          orf,
        ],
        [
          {
            source: first,
            target: second,
            label: 'is parent of'
          },
          {
            source: first,
            target: third,
            label: 'custom label'
          },
          {
            source: last,
            target: second,
            label: 'last label'
          },
          {
            source: last,
            target: third,
            label: 'custom label'
          },
          {
            source: orphana,
            target: orphanb,
            label: 'orphana-b'
          },
          {
            source: orphana,
            target: orphanc,
            label: 'orphana-c'
          },
          {
            source: orphanb,
            target: orphanc,
            label: 'orphanb-c'
          },
          {
            source: orc,
            target: ord,
            label: 'orcd'
          },
          {
            source: ord,
            target: ore,
            label: 'orde'
          },
          {
            source: ore,
            target: orf,
            label: 'oref'
          },
          {
            source: orphanc,
            target: orc,
            label: 'orphanc-orc'
          },
          {
            source: first,
            target: orf,
            label: 'oref'
          }
        ]
      )
    ];

    return { graphs };
  }

  genId(graphs: Graph[]): number {
    return graphs.length > 0
      ? Math.max(0, ...graphs.map(graph => graph.id)) + 1
      : 1;
  }
}
