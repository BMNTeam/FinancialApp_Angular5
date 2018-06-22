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
    public metaData: {[key: string]: {time: string; dynamics: number; }};

    constructor() {}

    ngOnInit() {
        this.setMetadata();
    }

    time(time: string): string {
        return this.metaData[time] && this.metaData[time].time;
    }

    dynamic(time: string): number {
        return this.metaData[time] && this.metaData[time].dynamics;
    }

    private getFormattedTime(date: string): string {
        return moment(+date).format('Do of MMM HH:MM a').toString();
    }

    private getDynamic(current: number, index: number): number {
        return (this.quotations[index - 1]) ? Math.round((this.quotations[index - 1].value - current) * 10000) / 10000 : 0;
    }

    private  setMetadata() {
        this.metaData = this.quotations.reduce( (result, item, index) =>  {

                result[item.time] = {
                    time: this.getFormattedTime(item.time),
                    dynamics: this.getDynamic(item.value, index)
                };
                return result;
                // To improve performance

                // id: item.time,
                // time: this.getFormattedTime(item.time),
                //
                // dynamics: this.getDynamic(item.value, index)
            }, {});
    }


}
