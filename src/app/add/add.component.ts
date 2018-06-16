import {Component, OnInit} from '@angular/core';
import {ConnectionService, Quotations} from '../connection.service';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {

    private _currencies: string[];
    public quotations: Quotations[];
    public currencies: string[];

    constructor(public connectionSrv: ConnectionService) {
        this.connectionSrv.currencies.subscribe(c =>
            this._currencies = c);
        this.quotations = connectionSrv.quotations;
    }

    ngOnInit() {
        this.currencies = this.getNewCurrencies();

    }

    private getNewCurrencies(): string[] {
        const exists = this._currencies;
        const currencies = ['USDJPY', 'USDRUB', 'USDINR', 'USDSEK', 'USDTHB', 'USDTRY'];

        return currencies
            .map( i => (exists.indexOf(i) === -1 ) ? i : null);
            // .filter(i => i) ; // why am I need this?

    }

    addQuotation(value: string) {
        this.connectionSrv.currencies.subscribe(c => this.currencies === c);
        this.connectionSrv.getAllQuotations();

        this.connectionSrv.resolved.subscribe(
            () => this.currencies = this.getNewCurrencies()
        );

    }



}
