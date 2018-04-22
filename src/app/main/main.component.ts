import { Component, OnInit } from '@angular/core';
import {ChartDirective} from './chart/chart.directive';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass'],
    providers: [ChartDirective]
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
