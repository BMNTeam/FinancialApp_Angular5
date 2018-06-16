import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavComponent} from './nav.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ConnectionService} from '../connection.service';
import {ConnectionMock} from '../connection.service.spec';

describe('NavComponent', () => {
    let component: NavComponent;
    let fixture: ComponentFixture<NavComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavComponent],
            imports: [RouterTestingModule],
            providers: [
                {provide: ConnectionService, useClass: ConnectionMock}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
