import {Component, OnInit} from '@angular/core';
import * as chartjs from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements  OnInit {
  title = 'app';
  lineChart: chartjs;

  ngOnInit(): void {
    console.dir(chartjs);
  }

}
