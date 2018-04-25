import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutes} from './routes';


import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {MainComponent} from './main/main.component';
import {FooterComponent} from './footer/footer.component';
import {ChartDirective} from './main/chart/chart.directive';
import {RouterModule} from '@angular/router';
import { SingleComponent } from './single/single.component';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { HttpClient, HttpHandler} from '@angular/common/http';
import {ConnectionService} from './connection.service';


@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        MainComponent,
        FooterComponent,
        ChartDirective,
        SingleComponent,
        AddComponent,
        ListComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(AppRoutes)
    ],
    providers: [HttpClient, ConnectionService, HttpHandler],
    bootstrap: [AppComponent]
})
export class AppModule {
}
