import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SingleComponent} from './single.component';
import {ChartDirective} from '../main/chart/chart.directive';
import {ListDetailsComponent} from '../lists/list-details/list-details.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ConnectionService} from '../connection.service';
import {ConnectionMock, quotations} from '../connection.service.spec';

describe('SingleComponent', () => {
    let component: SingleComponent;
    let fixture: ComponentFixture<SingleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SingleComponent, ChartDirective, ListDetailsComponent],
            imports: [RouterTestingModule],
            providers: [
                {provide: ConnectionService, useClass: ConnectionMock}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SingleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', async () => {

        expect(component).toBeTruthy();
    });

    it('should receive selected currency from route', async(async()  => {
        expect(component.selected).toBeUndefined();

        await component.router.params.toPromise();

        expect(component.selected).toBeDefined();
        // TODO: read about async in assertion, what the difference
    }));
});
