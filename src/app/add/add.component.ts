import {Component, OnInit} from '@angular/core';
import {ConnectionService, Quotations} from '../connection.service';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {

    public quotations: Quotations[];
    public currencies: string[];

    constructor(private connectionSrv: ConnectionService) {
        this.quotations = connectionSrv.quotations;
    }

    ngOnInit() {
        this.currencies = this.getNewCurrencies();
    }

    private getNewCurrencies(): string[] {
        const exists = this.connectionSrv.getCurrenciesList();
        const currencies = ['USDJPY', 'USDRUB', 'USDINR', 'USDSEK', 'USDTHB', 'USDTRY'];

        return currencies
            .map( i => (exists.indexOf(i) === -1 ) ? i : null)
            .filter(i => i) ;

    }

    addQuotation(value: string) {
        this.connectionSrv.currencies.push(value);
        this.connectionSrv.getAllQuotations();

        this.connectionSrv.resolved.subscribe( () => this.currencies = this.getNewCurrencies() );

    }



}
