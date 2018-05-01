import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface Quatation {
    time: Date;
    value: number;
}

interface Quatations {
    name: string;
    quatations: Quatation[];
}

@Injectable()
export class ConnectionService implements OnInit {
    url = 'https://www.alphavantage.co/';
    currencies: string[];
    quotations: Quatations[] = [];

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.currencies = this.getCurrenciesList();
        this.currencies.forEach( i => {
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

        return this.http.get(this.url + 'query?' + query).subscribe((res) => {
            // TODO: check out why function breaks in response
            this.quotations.push(this.mapResponse(res));
            console.dir(this.quotations);
        });
    }

    private mapResponse(res: any): Quatations {
        res = JSON.parse(JSON.stringify(res));
        const quotations: Quatations = {
            name: res['Meta Data']['2. Symbol'],
            quatations: []
        };

        const timeSeries = res['Time Series (15min)'];
        for (const key in timeSeries) {
            if (timeSeries.hasOwnProperty(key)) {
                quotations.quatations.push(
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
        return query.slice(0, query.lastIndexOf('&'));
    }

    private getCurrenciesList(): string[] {
        return ['EURUSD', 'EURGBP', 'CHFUSD', 'BTCUSD', 'AUDUSD', 'CADUSD'];
    }


}
