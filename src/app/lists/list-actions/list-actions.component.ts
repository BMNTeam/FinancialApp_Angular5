import {Component, OnInit, Input} from '@angular/core';
import {ConnectionService, Quotation, Quotations} from '../../connection.service';
import {LocalData} from '../../helpers/LocalData';

@Component({
    selector: 'app-list',
    templateUrl: './list-actions.component.html',
    styleUrls: ['../list.component.sass']
})
export class ListComponent implements OnInit {

    @Input() quotations: Quotations[];

    constructor( private connectionSrv: ConnectionService) {
    }

    ngOnInit() {

    }

    public getDynamic(q: Quotation[]): { dynamics: number, isIncreased: boolean } {
        const dynamics = Math.floor((q[q.length - 1].value - q[q.length - 2].value) * 100) / 100;
        return {
            dynamics,
            isIncreased: (dynamics > 0)
        };

    }

    public delete(name: string) {
        LocalData.delete(name);
        this.connectionSrv.ngOnInit();
    }



}
