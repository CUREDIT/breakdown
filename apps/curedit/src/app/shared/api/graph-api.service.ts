import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Graph } from '../../models/graph.model';
import { GraphService } from '../in-memory/graph.service';

@Injectable({
  providedIn: 'root'
})
export class SimApiService {
  private graphsUrl = 'api/graphs';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private graphService: GraphService) {}

  updateInMemoryGraph(g: Graph, remove = false): Graph {
    this.graphService.updateNodes(g.nodes, remove);
    this.graphService.updateEdges(g.edges, remove);
    return this.graphService.graph;
  }

  getBookmarkGraph(): Observable<Graph[]> {
    // todo
    return null;
  }

  getGraphs(): Observable<Graph[]> {
    return this.http.get<Graph[]>(this.graphsUrl).pipe(
      map(gArr => gArr.map(g => this.updateInMemoryGraph(g))),
      catchError(this.errorHandler<Graph[]>('getGraphs', []))
    );
  }

  getGraph(id: number): Observable<Graph> {
    return this.http.get<Graph>(this.graphsUrl + `/${id}`).pipe(
      map(g => this.updateInMemoryGraph(g)),
      catchError(this.errorHandler<Graph>(`getGraph/${id}`))
    );
  }

  createGraph(graph: Graph): Observable<Graph> {
    if (graph.id) {
      delete graph.id;
    }
    return this.http.post<Graph>(this.graphsUrl, graph, this.httpOptions).pipe(
      map(g => this.updateInMemoryGraph(g)),
      catchError(this.errorHandler<Graph>(`createGraph`))
    );
  }

  updateGraph(graph: Graph): Observable<Graph> {
    if (!graph.id) {
      throw new Error('No graph id for update found');
    }
    return this.http.put<Graph>(this.graphsUrl, graph, this.httpOptions).pipe(
      map(g => this.updateInMemoryGraph(g)),
      catchError(this.errorHandler<Graph>(`updateGraph`))
    );
  }

  deleteGraph(graph: Graph | number): Observable<Graph> {
    const id = typeof graph === 'number' ? graph : graph.id;

    return this.http
      .delete<Graph>(this.graphsUrl + `/${id}`, this.httpOptions)
      .pipe(
        map(g => this.updateInMemoryGraph(g, true)),
        catchError(this.errorHandler<Graph>(`deleteGraph/${id}`))
      );
  }

  private errorHandler<T>(request = 'default', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`Error on ${request}, ${error.message}`);
      return of(result);
    };
  }
}
