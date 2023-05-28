import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin, map, mergeMap, of, toArray } from 'rxjs';
export interface Fact {
  fact: string;
  length:number;
}

@Injectable({
  providedIn: 'root'
})


export class FactsServiceService {
  private facts: Fact[] = [];
  redirectUrl!: string;

  constructor(private router: Router, private http: HttpClient) { }

  getFacts(): Observable<Fact[]> {
    return this.http.get<any>('https://catfact.ninja/facts').pipe(
      map((response: any) => response.data.map((item: any) => ({
        fact: item.fact,
        length: item.length
      })))
    );
  }

  deleteFact(factIndex: number): Observable<void> {
    if (factIndex >= 0 && factIndex < this.facts.length) {
      this.facts.splice(factIndex, 1);
      console.log(`Fact at index ${factIndex} deleted`);
    }
    return of(undefined);
  }
}
