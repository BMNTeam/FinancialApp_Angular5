import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {FormsModule} from '@angular/forms';
import {ConnectionService, Quotations} from '../connection.service';

import {AddComponent} from './add.component';
import {ListComponent} from '../lists/list-actions/list-actions.component';
import {defer, Observable, of, Subject} from 'rxjs/index';
import {RouterTestingModule} from '@angular/router/testing';
import {async as _async} from 'rxjs/internal/scheduler/async';

export function fakeAsyncResponse<T>(data: T) {
    return defer(() => Promise.resolve(data));
}

export class ConnectionMock {
    get currencies() {
        return new Observable( observer => {
            observer.next(this._currencies);
            observer.complete();
        });

    }
    resolved: Subject<string> = new Subject<string>();


    private quotations: Quotations[] = [
        {
            name: 'EURUSD', quotations: [
                {time: Date.now().toString(), value: 1.42},
                {time: Date.now().toString(), value: 1.33},
                {time: Date.now().toString(), value: 1.20},
            ]
        },
        {
            name: 'USDJPY', quotations: [
                {time: Date.now().toString(), value: 1.42},
                {time: Date.now().toString(), value: 1.33},
                {time: Date.now().toString(), value: 1.20},
            ]
        },

    ];

    _currencies: string[] = ['EURUSD'];

    getCurrenciesList(): string[] {
        return this._currencies;
    }

    getAllQuotations(): Observable<Quotations[]> {
        // https://netbasal.com/testing-observables-in-angular-a2dbbfaf5329
        return of(this._currencies.map(i => this.getQuotation(i)), _async);
    }

    getQuotation(symbol: string): Quotations {
        this.resolved.next(symbol);
        return this.quotations.filter(i => i.name === symbol)[0];
    }
}

fdescribe('AddComponent', () => {
    let component: AddComponent;
    let fixture: ComponentFixture<AddComponent>;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddComponent, ListComponent],
            imports: [FormsModule, RouterTestingModule],
            providers: [
                {provide: ConnectionService, useClass: ConnectionMock}]

        })
            .compileComponents();


    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddComponent);

        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    afterEach(() => {
    });


    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should generate currencies', () => {
        component.currencies = [];

        expect(component.currencies.length).toBe(0);
        component.ngOnInit();

        expect(component.currencies.length).toBeGreaterThan(0);
    });

    it('should filter currencies', async(async() => {


        const defaultLength = component.currencies.length;
        fixture.detectChanges();

        component.addQuotation('USDJPY');

        await component.connectionSrv.resolved.toPromise();

        expect(component.currencies.length).toBeLessThan(defaultLength);


    }));
});
