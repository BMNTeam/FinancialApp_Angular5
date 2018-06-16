import {TestBed, inject} from '@angular/core/testing';

import {ConnectionService, Quotations} from './connection.service';
import {async as _async} from 'rxjs/internal/scheduler/async';
import {Observable, of, Subject} from 'rxjs/index';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

const time = Date.now().toString();

export const quotations: Quotations[] = [
    {
        name: 'EURUSD', quotations: [
            {time: time, value: 1.42},
            {time: time, value: 1.33},
            {time: time, value: 1.20},
        ]
    },
    {
        name: 'USDJPY', quotations: [
            {time: time, value: 1.42},
            {time: time, value: 1.33},
            {time: time, value: 1.20},
        ]
    },

];

export class ConnectionMock {

    get currencies() {
        return new Observable(observer => {
            observer.next(this._currencies);
            observer.complete();
        });

    }

    resolved: Subject<string> = new Subject<string>();

    private quotations: Quotations[] = quotations;

    _currencies: string[] = ['EURUSD'];

    getCurrenciesList(): string[] {
        return this._currencies;
    }

    getAllQuotations(): Observable<Quotations[]> {
        return of(this._currencies.map(i => this.getQuotation(i)), _async);
    }

    getQuotation(symbol: string): Quotations {
        this.resolved.next(symbol);
        return this.quotations.filter(i => i.name === symbol)[0];
    }
}

describe('ConnectionService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [ConnectionService]
        });
    });

    it('should be created', inject([ConnectionService], (service: ConnectionService) => {
        expect(service).toBeTruthy();
    }));
});
