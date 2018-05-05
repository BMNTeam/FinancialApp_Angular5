import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LocalData} from './helpers/LocalData';
import {environment} from '../environments/environment';

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
            apikey: environment.apiKey
        };

        const query = this.getQuotationsQuery(params);

        if (LocalData.getFromLocalStorage(symbol) && LocalData.isExpired() ) {
            this.quotations.push( LocalData.getFromLocalStorage(symbol) );
        } else {
            this.http.get(this.url + 'query?' + query).subscribe((res) => {
                this.quotations.push(this.mapResponse(res));
                LocalData.setToLocalStorage(this.mapResponse(res));

            });
        }
    }

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
