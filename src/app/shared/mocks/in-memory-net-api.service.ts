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
            from: first.id,
            to: second.id,
            label: 'is parent of'
          },
          {
            from: first.id,
            to: third.id,
            label: 'custom label'
          },
          {
            from: last.id,
            to: second.id,
            label: 'last label'
          },
          {
            from: last.id,
            to: third.id,
            label: 'custom label'
          },
          {
            from: orphana.id,
            to: orphanb.id,
            label: 'orphana-b'
          },
          {
            from: orphana.id,
            to: orphanc.id,
            label: 'orphana-c'
          },
          {
            from: orphanb.id,
            to: orphanc.id,
            label: 'orphanb-c'
          },
          {
            from: orc.id,
            to: ord.id,
            label: 'orcd'
          },
          {
            from: ord.id,
            to: ore.id,
            label: 'orde'
          },
          {
            from: ore.id,
            to: orf.id,
            label: 'oref'
          },
          {
            from: orphanc.id,
            to: orc.id,
            label: 'orphanc-orc'
          },
          {
            from: first.id,
            to: orf.id,
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
