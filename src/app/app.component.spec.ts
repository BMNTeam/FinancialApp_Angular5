import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {FooterComponent} from './footer/footer.component';
import {MainComponent} from './main/main.component';
import {ChartDirective} from './main/chart/chart.directive';
import {RouterTestingModule} from '@angular/router/testing';
import {ListComponent} from './lists/list-actions/list-actions.component';
import {ConnectionService} from './connection.service';
import {ConnectionMock} from './connection.service.spec';

describe('AppComponent', () => {
    let app: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                NavComponent,
                FooterComponent,
                MainComponent,
                ChartDirective,
                ListComponent
            ],
            imports: [RouterTestingModule],
            providers: [{provide: ConnectionService, useClass: ConnectionMock}]
        }).compileComponents();

    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    })
    it('should create the app', async(() => {

        expect(app).toBeTruthy();
    }));

    it('should init connection service', () => {
        spyOn(app.connectionSrv, 'ngOnInit');

        app.ngOnInit();

        expect(app.connectionSrv.ngOnInit).toHaveBeenCalled();
    });
});
