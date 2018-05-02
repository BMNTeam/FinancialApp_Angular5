import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';

export interface Quotation {
    time: Date;
    value: number;
}

export interface Quotations {
    name: string;
    quotations: Quotation[];
}

@Injectable()
export class ConnectionService implements OnInit {

    private _lastUpdate: Date;
    private _quotations = 'quotations';

    url = 'https://www.alphavantage.co/';
    currencies: string[];
    quotations: Quotations[] = [];

    constructor(private http: HttpClient) {
        this.currencies = this.getCurrenciesList();


    }

    ngOnInit() {
        this.currencies.forEach(i => {
            this.getQuotations(i);
        });
    }

    public getQuotations(symbol: string) {
        const params: { [param: string]: string } = {
            function: 'TIME_SERIES_INTRADAY',
            symbol: symbol,
            interval: '15min',
            outputsize: 'full',
            apikey: '7FC8OSCVV6HT2FEY'
        };

        const query = this.getQuotationsQuery(params);

        function isExpired (): boolean {
            return !!localStorage.getItem('lastUpdate');
        }


        if (this.getFromLocalStorage(symbol) && isExpired() ) {
            this.quotations.push( this.getFromLocalStorage(symbol) );
        } else {
            this.http.get(this.url + 'query?' + query).subscribe((res) => {
                this.quotations.push(this.mapResponse(res));
                this.setToLocalStorage(this.mapResponse(res));

            });
        }
    }


    // Begin local storage block
    private getFromLocalStorage(name: string): Quotations   {
        const data: {quotations: Quotations[]} = JSON.parse(localStorage.getItem(this._quotations));
        if ( data) {
            return data.quotations.filter( i => i.name === name)[0];
        } else {
            this.initInLocalStorage();
        }
    }

    private initInLocalStorage(): void {
        const quatations = { quotations: [] } as Quotations[];
        localStorage.setItem(this._quotations, JSON.stringify(quatations));
    }

    private setToLocalStorage(item: Quotations ) {
        const data: { quotations: Quotations[]} = JSON.parse( localStorage.getItem(this._quotations) );

        // Push new if not exist in local storage
        if (data.quotations.some( i => i.name === item.name)) {
            data.quotations.map( i => { if (i.name === item.name) { i = item; } });
        } else {
            data.quotations.push(item);
        }

        localStorage.setItem(this._quotations, JSON.stringify(data));
        localStorage.setItem('lastUpdate', new Date().toDateString());
    }
    // END local storage block

    private mapResponse(res: any): Quotations {
        res = JSON.parse(JSON.stringify(res));
        const quotations: Quotations = {
            name: res['Meta Data']['2. Symbol'],
            quotations: []
        };

        const timeSeries = res['Time Series (15min)'];
        for (const key in timeSeries) {
            if (timeSeries.hasOwnProperty(key)) {
                quotations.quotations.push(
                    {
                        time: new Date(key),
                        value: +timeSeries[key]['1. open']
                    }
                );
            }
        }

        return quotations;
    }

    private getQuotationsQuery(params: { [param: string]: string }): string {
        let query = '';
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                query += `${key}=${params[key]}&`;
            }
        }
        // Make sure that your API key doesn't end with ampersand letter
        return query.slice(0, query.lastIndexOf('&'));
    }

    private getCurrenciesList(): string[] {
        return ['EURUSD', 'EURGBP', 'CHFUSD', 'BTCUSD', 'AUDUSD', 'CADUSD'];
    }


}
