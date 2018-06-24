import {TestBed, getTestBed} from '@angular/core/testing';

import {ConnectionService, Quotations} from './connection.service';
import {Subject} from 'rxjs/index';
import {OnInit} from '@angular/core';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

const time = Date.now();

export const quotations: Quotations[] = [
    {
        name: 'EURUSD', quotations: [
            {time: (+time - 1).toString(), value: 1.42},
            {time: (+time - 2).toString(), value: 1.33},
            {time: (+time - 3).toString(), value: 1.20},
        ]
    },
    {
        name: 'USDJPY', quotations: [
            {time: (+time - 1).toString(), value: 1.42},
            {time: (+time - 2).toString(), value: 1.33},
            {time: (+time - 3).toString(), value: 1.20},
        ]
    },

];

export class ConnectionMock implements OnInit {

    currencies: string[] = ['EURUSD'];
    resolved: Subject<string> = new Subject<string>();

    private quotations: Quotations[] = quotations;

    ngOnInit() {

    }

    getCurrenciesList(): string[] {
        return this.currencies;
    }

    getAllQuotations(): Quotations[] {
        return this.currencies.map(i => this.getQuotation(i));
    }

    getQuotation(symbol: string): Quotations {
        this.resolved.next(symbol);
        return this.quotations.filter(i => i.name === symbol)[0];
    }
}

describe('ConnectionService', () => {
    let injector: TestBed;
    let service: ConnectionService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ConnectionService]
        });

        injector = getTestBed();
        service = injector.get(ConnectionService);
        httpMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get currencies list on init', () => {
        spyOn(service, 'getQuotation').and.returnValue(true);
        expect(service.currencies.length).toBe(0);


        service.ngOnInit();

        expect(service.currencies.length).toBeGreaterThan(0);
    });

    it('should receive quotation', () => {
        spyOn(service, 'mapResponse').and.returnValue(true);

        expect(service.quotations.length).toBe(0);
        service.getQuotation(quotations[0].name);

        const req = httpMock.expectOne(r => r.url && r.method === 'GET');
        req.flush(quotations);

        expect(service.quotations.length).toBeGreaterThan(0);
    });

    it('should generate query string', () => {
        const query = service.getQuotationsQuery({test: 'works', another: 'works1'});

        expect(query).toBe('test=works&another=works1');
    });

    it('should map response', () => {

        const r = {
            'Meta Data': {
                '1. Information': 'Intraday (15min) prices and volumes',
                '2. Symbol': 'THBUSD',
                '3. Last Refreshed': '2018-06-23 07:30:00',
                '4. Interval': '15min',
                '5. Output Size': 'Full size',
                '6. Time Zone': 'US/Eastern'
            },
            'Time Series (15min)': {
                '2018-06-23 07:30:00': {
                    '1. open': '0.0304',
                    '2. high': '0.0304',
                    '3. low': '0.0304',
                    '4. close': '0.0304',
                    '5. volume': '0'
                },
                '2018-06-23 07:15:00': {
                    '1. open': '0.0304',
                    '2. high': '0.0304',
                    '3. low': '0.0304',
                    '4. close': '0.0304',
                    '5. volume': '0'
                },
            }
        };

        const m = service.mapResponse(r);

        expect(m.name).toBe('THBUSD');
        expect(m.quotations.length).toBe(2);
    });


});
