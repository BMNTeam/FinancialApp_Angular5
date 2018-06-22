import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ListDetailsComponent} from './list-details.component';
import {ConnectionService} from '../../connection.service';
import {ConnectionMock, quotations} from '../../connection.service.spec';

// !!! Write about this Error
// https://stackoverflow.com/questions/45722256/how-do-i-debug-a-object-errorevent-thrown-error-in-my-karma-jasmine-tests



describe('ListDetailsComponent', () => {
    let component: ListDetailsComponent;
    let fixture: ComponentFixture<ListDetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListDetailsComponent],
            providers: [
                {provide: ConnectionService, useClass: ConnectionMock}
            ]
        })
            .compileComponents();

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListDetailsComponent);
        component = fixture.componentInstance;
        component.quotations = quotations[0].quotations;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set metadata when init', () => {
        expect(Object.keys(component.metaData).length).toBeGreaterThan(0);
    });

    it('should receive formatted time', () => {
        expect(component.time(quotations[0].quotations[0].time)).toContain('of'); // 22nd of June for example
    });

    it('should receive dynamics', () => {
        expect(component.dynamic(quotations[0].quotations[1].time)).toBeGreaterThan(0); // Just 0 is the same value
    });
});
