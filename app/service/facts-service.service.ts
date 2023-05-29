import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin, map, mergeMap, of, toArray } from 'rxjs';
export interface Fact {
  fact: string;
  length: number;
}

@Injectable({
  providedIn: 'root'
})

export class FactsServiceService {

  public facts: Fact[] = [];

  constructor(private http: HttpClient) { }

  getAllFacts(): Observable<Fact[]> {
    return this.http.get<any>('https://catfact.ninja/facts').pipe(
      mergeMap((response: any) => {
        const totalPages = response.last_page;
        const pageRequests = [];
        for (let page = 1; page <= totalPages; page++) {
          pageRequests.push(this.getFacts(page));
        }
        return forkJoin(pageRequests).pipe(
          map((factArrays: Fact[][]) => {
            return factArrays.reduce((accumulator: Fact[], current: Fact[]) => accumulator.concat(current), []);
          })
        );
      })
    );
  }

  getFacts(page: number): Observable<Fact[]> {
    return this.http.get<any>(`https://catfact.ninja/facts?page=${page}`).pipe(
      map((response: any) => response.data)
    );
  }

  deleteFact(factIndex: number): Observable<void> {
    this.facts.splice(factIndex, 1);
    console.log(`Fact at index ${factIndex} deleted`);
    return of(undefined);
  }
}
