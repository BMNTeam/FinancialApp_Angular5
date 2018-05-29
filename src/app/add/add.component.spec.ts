import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsModule} from '@angular/forms';
import {ConnectionService, Quotations} from '../connection.service';

import {AddComponent} from './add.component';
import {ListComponent} from '../lists/list-actions/list-actions.component';
import {Observable, Subject} from 'rxjs/index';
import {RouterTestingModule} from '@angular/router/testing';


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
        return Observable.create(this.currencies.map(i => this.getQuotation(i)));
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

    it('should filter currencies', () => {

        const current = component.currencies.length;
        component.addQuotation('USDJPY');

        // TODO: find why connectionSrv.resolve doesn't trigger next event in component
        expect(component.currencies.length).toBeLessThan(current);





    });
});
