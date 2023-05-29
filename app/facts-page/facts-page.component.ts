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
  fact: any;
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


  search(): void {
    if (this.fact === '') {
      this.ngOnInit();
    } else {
      this.facts = this.facts.filter((res: { fact: string; }) => {
        return res.fact.toLocaleLowerCase().match(this.fact.toLocaleLowerCase());
      });
    }
  }




















  ngOnInit(): void {
    this.getAllFacts();
  }
}

