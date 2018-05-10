import {Quotations} from '../connection.service';
import * as moment from 'moment';

export class LocalData  {
    static _quotations = 'quotations';

    static getFromLocalStorage(name: string): Quotations   {
        const data: {quotations: Quotations[]} = JSON.parse(localStorage.getItem(this._quotations));
        if ( data) {
            return data.quotations.filter( i => i.name === name)[0];
        } else {
            this.initInLocalStorage();
        }
    }

    static initInLocalStorage(): void {
        const quotations = { quotations: [] };
        localStorage.setItem(this._quotations, JSON.stringify(quotations));
    }

    static setToLocalStorage(item: Quotations ) {
        const data: { quotations: Quotations[]} = JSON.parse( localStorage.getItem(this._quotations) );

        // Push new if not exist in local storage
        if (data.quotations.some( i => i.name === item.name)) {
            data.quotations.map( i => { if (i.name === item.name) { i = item; } });
        } else {
            data.quotations.push(item);
        }

        localStorage.setItem(this._quotations, JSON.stringify(data));
        localStorage.setItem('lastUpdate',  Date.now().toString());
    }

    static isExpired (): boolean {
        const lastUpdate = localStorage.getItem('lastUpdate');

        if ( lastUpdate) {
            const now = moment(Date.now());
            const previous =  moment(lastUpdate);

            // TODO: fix with momentJS
            const diff = moment.duration(now.diff(previous)).asHours();
            console.dir(now.hours());
            console.dir(previous.toDate());


            return ((now - previous) / 1000 * 60 * 60 * 10 < 10 );

        } else {
            return false;
        }
    }

}
