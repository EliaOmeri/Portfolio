import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fact, FactsServiceService } from '../service/facts-service.service';

@Component({
  selector: 'app-fact-details',
  templateUrl: './fact-details.component.html',
  styleUrls: ['./fact-details.component.css']
})
export class FactDetailsComponent implements OnInit {
  factIndex: number = -1;
fact!:Fact;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: FactsServiceService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.factIndex = params['index'];
      this.service.getFacts().subscribe(response => {
        response.filter(fact => {
          this.fact = response[this.factIndex];
        })
      })
    });
  }

  deleteFact(): void {
    if (this.factIndex >= 0) {
      this.service.deleteFact(this.factIndex).subscribe(() => {
        console.log(`Fact at index ${this.factIndex} deleted`);
        this.router.navigate(['/list']);
      });
    }
  }
}
