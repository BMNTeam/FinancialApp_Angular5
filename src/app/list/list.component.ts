import {Component, OnInit, Input} from '@angular/core';
import {Quotation, Quotations} from '../connection.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

    @Input() quotations: Quotations[];

    constructor() {
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

}
