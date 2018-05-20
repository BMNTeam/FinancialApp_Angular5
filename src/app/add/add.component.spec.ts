import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsModule} from '@angular/forms';
import {ConnectionService} from '../connection.service';

import {AddComponent} from './add.component';
import {ListComponent} from '../lists/list-actions/list-actions.component';
import {RouterModule} from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClient, HttpHandler} from '@angular/common/http';

fdescribe('AddComponent', () => {
    let component: AddComponent;
    let fixture: ComponentFixture<AddComponent>;

    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddComponent, ListComponent],
            imports: [FormsModule, RouterModule, HttpClientTestingModule ],
            providers: [ConnectionService, HttpHandler],
        })
            .compileComponents();

        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddComponent);

        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        // httpTestingController.verify();
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

    it('should add currency', () => {
        const current = component.currencies.length;
        console.dir(httpTestingController);
        //const req = httpTestingController.expectOne({method: 'GET'});


        component.addQuotation('sadf');

    });
});
