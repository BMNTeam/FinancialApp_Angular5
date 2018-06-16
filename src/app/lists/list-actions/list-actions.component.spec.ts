import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ListComponent} from './list-actions.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ConnectionService} from '../../connection.service';
import {ConnectionMock, quotations} from '../../connection.service.spec';

describe('ListActionsComponent', () => {
    let component: ListComponent;
    let fixture: ComponentFixture<ListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListComponent],
            imports: [RouterTestingModule],
            providers: [
                {provide: ConnectionService, useClass: ConnectionMock}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should calculate dynamics', () => {
        const {dynamics, isIncreased} = component.getDynamic(quotations[0].quotations);
        expect(dynamics).toBeDefined();
        expect(isIncreased).toBeDefined();
    });
});
