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
  fact!: Fact;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: FactsServiceService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.factIndex = params['index'];
      console.log(this.factIndex);

      this.service.getFacts(1).subscribe(response => {
        console.log(response);
        this.fact = response[this.factIndex];
      });


    });
  }


  deleteFact(): void {
    const index = Number(this.factIndex);
    if (!isNaN(index) && index >= 0) {
      this.service.deleteFact(index).subscribe(() => {
        console.log(`Fact at index ${index} deleted`);
        this.service.getAllFacts().subscribe(updatedFacts => {
          this.service.facts = updatedFacts;
          this.router.navigate(['/list']);
        });
      });
    }
  }




}