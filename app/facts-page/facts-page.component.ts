import { Component, OnInit } from '@angular/core';
import { Fact, FactsServiceService } from '../service/facts-service.service';
import { FactInfo } from '../model/fact-info';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PaginatePipe } from 'ngx-pagination';


@Component({
  selector: 'app-facts-page',
  templateUrl: './facts-page.component.html',
  styleUrls: ['./facts-page.component.css']
})


export class FactsPageComponent implements OnInit {
  page: number = 1;
  facts: Fact[] = [];
  fact: string = '';

  constructor(private service: FactsServiceService, private router: Router) {}

  getNinjaFacts(): void {
    this.service.getFacts().subscribe((response: Fact[]) => {
      this.facts = response;
    });
  }

  navigateToDetails(factIndex: number): void {
    this.router.navigate(['/details', factIndex]);
  }

  search(): void {
    if (this.fact === '') {
      this.getNinjaFacts();
    } else {
      this.service.getFacts().subscribe((response: Fact[]) => {
        this.facts = response.filter((fact) => fact.fact.toLowerCase().includes(this.fact.toLowerCase()));
      });
    }
  }

  ngOnInit(): void {
    this.getNinjaFacts();
  }
}
