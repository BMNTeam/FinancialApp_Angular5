import {TestBed, async} from '@angular/core/testing';
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
            providers: [{provide: ConnectionService, use: ConnectionMock}]
        }).overrideComponent(NavComponent, {
            set: {
                providers: [
                    {provide: ConnectionService, useClass: ConnectionMock}
                ]
            }
        }).compileComponents();

    }));
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
