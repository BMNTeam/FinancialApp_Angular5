import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsModule} from '@angular/forms';
import {ConnectionService} from '../connection.service';
import {ConnectionMock} from '../connection.service.spec';

import {AddComponent} from './add.component';
import {ListComponent} from '../lists/list-actions/list-actions.component';
import {RouterTestingModule} from '@angular/router/testing';



describe('AddComponent', () => {
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
