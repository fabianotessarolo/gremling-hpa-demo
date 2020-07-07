import { Component, OnInit } from '@angular/core';
import { GremlingService } from './gremling.service';
import { Gremling } from './gremling';

@Component({
  selector: 'app-gremling',
  templateUrl: './gremling.component.html',
  styleUrls: ['./gremling.component.scss'],
  providers: [GremlingService],
})



export class GremlingComponent implements OnInit {

  gremling: Gremling;
  error: any;
  
  constructor(private gremlingService: GremlingService) { }


  ngOnInit() {
    this.getGremlings();
  }

  getGremlings(){
    this.gremlingService.getGremlings()
      // .subscribe(
      //   (data: Gremling) => this.gremling = { ...data }, // success path
      //   error => this.error = error // error path
      // );
      .subscribe((data: Gremling) => this.gremling = {
        messages: data['Messages'],
        name:  data['Name'],
        consumers: data['Consumers']
    });
    }

}
