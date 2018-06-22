import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MainComponent} from './main.component';
import {ChartDirective} from './chart/chart.directive';
import {ListComponent} from '../lists/list-actions/list-actions.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ConnectionService} from '../connection.service';
import {ConnectionMock, quotations} from '../connection.service.spec';

describe('MainComponent', () => {
    let component: MainComponent;
    let fixture: ComponentFixture<MainComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MainComponent, ChartDirective, ListComponent],
            imports: [RouterTestingModule],
            providers: [
                {provide: ConnectionService, useClass: ConnectionMock}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should select currency to showing on the chart', () => {
        const q = quotations[1].name;
        component.select(q);
        expect(component.current.name).toBe(q);
    });

    it('should select first quotation when initialize', () => {
        const q = quotations[0].name;
        component.ngOnInit();

        expect(component.current.name).toBe(q);
    });
});
