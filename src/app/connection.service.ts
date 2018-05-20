import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Subject} from 'rxjs/index';

import {LocalData} from './helpers/LocalData';
import * as moment from 'moment';

export interface Quotation {
    time: string;
    value: number;
}

export interface Quotations {
    name: string;
    quotations: Quotation[];
}

@Injectable()
export class ConnectionService implements OnInit {

    url = 'https://www.alphavantage.co/';
    currencies: string[];
    quotations: Quotations[] = [];
    resolved: Subject<string> = new Subject<string>();

    constructor(private http: HttpClient) {

    }

    ngOnInit() {
        this.currencies = this.getCurrenciesList();
        this.getAllQuotations();
    }

    public getAllQuotations() {
        this.quotations.length = 0;
        this.currencies.forEach(i => {
            this.getQuotation(i);
        });
    }

    public getQuotation(symbol: string) {
        const params: { [param: string]: string } = {
            function: 'TIME_SERIES_INTRADAY',
            symbol: symbol,
            interval: '15min',
            outputsize: 'full',
            apikey: environment.apiKey
        };

        const query = this.getQuotationsQuery(params);

        if (!LocalData.isInitialized()) { LocalData.init(); }

        if (LocalData.exist(symbol) && LocalData.notExpired() ) {
            this.quotations.push( LocalData.get(symbol) );
            this.resolved.next(LocalData.get(symbol).name);
        } else {
            this.http.get(this.url + 'query?' + query).subscribe((res) => {
                const mappedRes = this.mapResponse(res);

                this.quotations.push(mappedRes);
                LocalData.set(mappedRes);
                this.resolved.next(mappedRes.name);

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
                        time: moment(key).toLocaleString(),
                        value: +timeSeries[key]['1. open']
                    }
                );
            }
        }
        quotations.quotations.sort( (a, b) => new Date(b.time).valueOf() - new Date(a.time).valueOf());

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

    public getCurrenciesList(): string[] {
        return (LocalData.getCurrenciesList())
            ? LocalData.getCurrenciesList()
            : ['EURUSD', 'EURGBP', 'CHFUSD', 'BTCUSD', 'AUDUSD', 'CADUSD'];
    }


}
