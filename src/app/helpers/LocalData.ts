import {Quotations} from '../connection.service';

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
        const quatations = { quotations: [] } as Quotations[];
        localStorage.setItem(this._quotations, JSON.stringify(quatations));
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
        localStorage.setItem('lastUpdate', new Date().toDateString());
    }

    static isExpired (): boolean {
        return !!localStorage.getItem('lastUpdate');
    }

}
