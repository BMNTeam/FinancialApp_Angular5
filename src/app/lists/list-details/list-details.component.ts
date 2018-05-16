import {Component, Input, OnInit} from '@angular/core';
import {Quotation} from '../../connection.service';
import * as moment from 'moment';

@Component({
    selector: 'app-list-details',
    templateUrl: './list-details.component.html',
    styleUrls: ['../list.component.sass']
})
export class ListDetailsComponent implements OnInit {

    @Input() quotations: Quotation[];
    public metaData: {id: Date, time: string, dynamics: number}[];

    constructor() {

    }

    private getFormattedTime(date: Date): string {
        return moment(date).format('Do of MMM HH:MM a').toString();
    }

    time(time: Date): string {
        return this.metaData.find(v => v.id === time).time;
    }

    dynamics(time: Date): number {
        return this.metaData.find(v => v.id === time).dynamics;
    }

    private getDynamic(current: number, index: number): number {
        return (this.quotations[index - 1]) ? Math.round((this.quotations[index - 1].value - current) * 100) / 100 : 0;
    }


    ngOnInit() {
        this.quotations.sort( (a, b) => new Date(b.time).valueOf() - new Date(a.time).valueOf());
        this.setMetadata();

    }
    // TODO: check out why dynamics in AUDUSD is 0 everywhere
    private  setMetadata() {
        this.metaData = this.quotations.map( (item, index) => (
            {
                id: item.time,
                time: this.getFormattedTime(item.time),

                dynamics: this.getDynamic(item.value, index)
            }));
    }


}
