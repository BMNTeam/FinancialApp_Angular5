import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ConnectionService, Quotations} from '../connection.service';

@Component({
    selector: 'app-single',
    templateUrl: './single.component.html',
    styleUrls: ['./single.component.sass']
})
export class SingleComponent implements OnInit {
    quotations: Quotations;
    selected: string;

    constructor(public router: ActivatedRoute, private _connectionSrv: ConnectionService ) {
    }

    ngOnInit() {
        this.router.params.subscribe( v  => {
            this.selected = v.id;
            this.quotations = this._connectionSrv.quotations.filter( i => i.name === v.id)[0];

        });
    }

}
