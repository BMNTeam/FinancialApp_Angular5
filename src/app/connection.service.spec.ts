import {TestBed, inject} from '@angular/core/testing';

import {ConnectionService, Quotations} from './connection.service';
import {Subject} from 'rxjs/index';
import {HttpClientModule} from '@angular/common/http';

const time = Date.now().toString();

export const quotations: Quotations[] = [
    {
        name: 'EURUSD', quotations: [
            {time: time - 1, value: 1.42},
            {time: time - 2, value: 1.33},
            {time: time - 3, value: 1.20},
        ]
    },
    {
        name: 'USDJPY', quotations: [
            {time: time - 1, value: 1.42},
            {time: time - 2, value: 1.33},
            {time: time - 3, value: 1.20},
        ]
    },

];

export class ConnectionMock {

    currencies: string[] = ['EURUSD'];
    resolved: Subject<string> = new Subject<string>();

    private quotations: Quotations[] = quotations;


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
