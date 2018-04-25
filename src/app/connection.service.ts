import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {forEach} from '@angular/router/src/utils/collection';

const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' +
    'EURUSD&interval=15min&outputsize=full&apikey=7FC8OSCVV6HT2FEY';

@Injectable()
export class ConnectionService implements  OnInit {
    currencies: string[];
    constructor(private http: HttpClient) {}
    ngOnInit() {
        this.currencies = this.getCurrencies();
        this.http.get(url);
    }

    public getCurrencies(symbol: string) {
        const params: {[param: string]: string } = {
            function: 'TIME_SERIES_INTRADAY',
            symbol: symbol,
            interval: '15min',
            outputsize: 'full',
            apikey: '7FC8OSCVV6HT2FEY'
        };
        for (const key of params) {

        }
    }

    private getCurrencies(): string[] {
        return [
            'EURUSD',
            'EURGBP',
            'CHFUSD',
            'BTCUSD',
            'AUDUSD',
            'CADUSD'
        ];
    }


}
