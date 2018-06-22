import {Component, OnInit} from '@angular/core';
import {ChartDirective} from './chart/chart.directive';
import {ConnectionService, Quotations} from '../connection.service';


@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.sass'],
    providers: [ChartDirective]
})
export class MainComponent implements OnInit {

    quotations: Quotations[] = [];
    current: Quotations;

    constructor(private connectionSrv: ConnectionService) {
        this.quotations = this.connectionSrv.quotations;
        if (this.quotations.length) {this.select(this.quotations[0].name); }
    }

    select(name: string) {
        this.current = this.quotations.filter(i => i.name === name)[0];
    }

    ngOnInit() {
        this.connectionSrv.resolved.subscribe(i => {
            if (!this.current) { this.select(this.quotations[0].name); }
        });
    }

}
