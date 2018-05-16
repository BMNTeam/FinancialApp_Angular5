import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutes } from './routes';


import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { ChartDirective } from './main/chart/chart.directive';
import { RouterModule } from '@angular/router';
import { SingleComponent } from './single/single.component';
import { AddComponent } from './add/add.component';
import { ListComponent } from './lists/list-actions/list-actions.component';
import { HttpClientModule } from '@angular/common/http';
import { ConnectionService } from './connection.service';
import { FormsModule} from '@angular/forms';
import { ListDetailsComponent } from './lists/list-details/list-details.component';


@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        MainComponent,
        FooterComponent,
        ChartDirective,
        SingleComponent,
        AddComponent,
        ListComponent,
        ListDetailsComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(AppRoutes)
    ],
    providers: [ConnectionService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
