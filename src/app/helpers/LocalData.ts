import {Quotations} from '../connection.service';
import * as moment from 'moment'; // Use to find difference between dates in minutes

export class LocalData {
    static _quotations = 'quotations';
    static _lastUpdate = 'lastUpdate';

    static get(name: string): Quotations {
        const data = this.getAllQuotations();
        return data.filter(i => i.name === name)[0];
    }

    static getAllQuotations(): Quotations[] {
        return JSON.parse(localStorage.getItem(this._quotations));
    }

    static exist(name: string): boolean {
        const data = this.getAllQuotations();

        return (data && data.some( i => i.name === name));
    }

    static isInitialized(): boolean {
        return (!!localStorage.getItem(this._quotations));
    }

    static init(): void {
        // TODO: check out what has break
        const quotations = [];
        localStorage.setItem(this._quotations, JSON.stringify(quotations));
    }

    static set(item: Quotations) {
       const data = this.getAllQuotations();

        // Push new if not exist in local storage
        if (data.some(i => i.name === item.name)) {
            // Replace previous value
            data.forEach(i => {
                if (i.name === item.name) { i = item; }
            });
        } else {
            // Otherwise add new currency
            data.push(item);
        }

        this.save(data);
        localStorage.setItem(this._lastUpdate, JSON.stringify(moment()));
    }

    static delete(name: string) {
        const quotations = this.getAllQuotations();

        quotations.splice(quotations.findIndex(value => value.name === name), 1);
        this.save(quotations);

    }

    static save(quotations: Quotations[]) {
        localStorage.setItem(this._quotations, JSON.stringify(quotations));
    }

    static notExpired(): boolean {
        const lastUpdate = JSON.parse(localStorage.getItem(this._lastUpdate));
        return (lastUpdate && moment().diff(lastUpdate, 'minutes') < 50);
    }

    static getCurrenciesList(): string[]  {
        return (this.isInitialized() && this.getAllQuotations().length > 1)
            ? this.getAllQuotations().map( i => i.name)
            : null;
    }

}
