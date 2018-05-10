import { Component, OnInit } from '@angular/core';
import {ChartDirective} from './chart/chart.directive';
import {Quotations, Quotation, ConnectionService} from '../connection.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass'],
    providers: [ChartDirective]
})
export class MainComponent implements OnInit {

  quotations: Quotations[] = [];
  current: Quotations;

  constructor(private _connectionSrv: ConnectionService) {
      this.quotations = this._connectionSrv.quotations;
  }

  // TODO: find better way to work with ASYNC data
  select (name: string) {
      this.current = this.quotations.filter( i => i.name === name)[0];
  }

  ngOnInit() {
    if (this.quotations[0]) {this.select(this.quotations[1].name); }
  }

}
