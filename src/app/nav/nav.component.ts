import {Component, OnInit} from '@angular/core';
import {ConnectionService} from '../connection.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {

    constructor(private connectionSrv: ConnectionService) {
        this.connectionSrv.resolved.subscribe( i => this.currencies = this.connectionSrv.getCurrenciesList());
    }
    public currencies: string[];

    ngOnInit() {
    }



}
