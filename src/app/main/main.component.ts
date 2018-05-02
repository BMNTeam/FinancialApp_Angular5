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

  constructor(private _connectionSrv: ConnectionService) {
      this.quotations = this._connectionSrv.quotations;
  }

  ngOnInit() {

  }

}
