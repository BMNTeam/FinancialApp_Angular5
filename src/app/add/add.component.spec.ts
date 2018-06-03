import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {FormsModule} from '@angular/forms';
import {ConnectionService, Quotations} from '../connection.service';

import {AddComponent} from './add.component';
import {ListComponent} from '../lists/list-actions/list-actions.component';
import {Observable, of, Subject} from 'rxjs/index';
import {RouterTestingModule} from '@angular/router/testing';
import {async as _async} from 'rxjs/internal/scheduler/async';


export class ConnectionMock {
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

    currencies: string[] = ['EURUSD'];

    getCurrenciesList(): string[] {
        return this.currencies;
    }

    getAllQuotations(): Observable<Quotations[]> {
        // https://netbasal.com/testing-observables-in-angular-a2dbbfaf5329
        return of(this.currencies.map(i => this.getQuotation(i)), _async);
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

    it('should filter currencies', fakeAsync(() => {

        const current = component.currencies.length;
        component.addQuotation('USDJPY');

        // TODO: try this article
        // https://netbasal.com/testing-observables-in-angular-a2dbbfaf5329
         tick();
         fixture.detectChanges();
        // TODO: find why connectionSrv.resolve doesn't trigger next event in component

        expect(component.currencies.length).toBeLessThan(current);


    }));
});
