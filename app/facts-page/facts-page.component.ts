import { Component, OnInit } from '@angular/core';
import { Fact, FactsServiceService } from '../service/facts-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-facts-page',
  templateUrl: './facts-page.component.html',
  styleUrls: ['./facts-page.component.css']
})


export class FactsPageComponent implements OnInit {

  page: number = 1;
  facts: Fact[] = [];
  fact: string = '';
  totalItems: number = 0;

  constructor(private service: FactsServiceService, private router: Router) { }



  getAllFacts(): void {
    this.service.getAllFacts().subscribe((facts: Fact[]) => {
      this.facts = facts;
      this.totalItems = facts.length;
    });
  }

  navigateToDetails(factItem: Fact): void {
    const factIndex = this.facts.indexOf(factItem);
    this.router.navigate(['/details', factIndex]);
  }

  deleteFact(factItem: Fact): void {
    const factIndex = this.facts.indexOf(factItem);
    if (factIndex >= 0) {
      this.service.deleteFact(factIndex).subscribe(() => {
        console.log(`Fact at index ${factIndex} deleted`);
        this.facts.splice(factIndex, 1);
      });
    }
  }

  search(): void {
    if (this.fact === '') {
      this.getAllFacts();
    } else {
      this.service.getAllFacts().subscribe((facts: Fact[]) => {
        this.facts = facts.filter((fact) => fact.fact.toLowerCase().includes(this.fact.toLowerCase()));
        this.totalItems = this.facts.length;
      });
    }


  }
  ngOnInit(): void {
    this.getAllFacts();
  }
}

