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
    public metaData: {id: string, time: string, dynamics: number}[];

    constructor() {

    }

    private getFormattedTime(date: string): string {
        return moment(date).format('Do of MMM HH:MM a').toString();
    }

    time(time: string): string {
        return this.metaData.find(v => v.id === time).time;
    }

    dynamics(time: string): number {
        return this.metaData.find(v => v.id === time).dynamics;
    }

    private getDynamic(current: number, index: number): number {
        return (this.quotations[index - 1]) ? Math.round((this.quotations[index - 1].value - current) * 10000) / 10000 : 0;
    }


    ngOnInit() {
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
