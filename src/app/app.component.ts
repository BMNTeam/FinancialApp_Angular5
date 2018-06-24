import {Component, OnInit} from '@angular/core';
import {ConnectionService} from './connection.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
    constructor(public connectionSrv: ConnectionService) {}

    ngOnInit(): void {
        this.connectionSrv.ngOnInit();
    }

}
