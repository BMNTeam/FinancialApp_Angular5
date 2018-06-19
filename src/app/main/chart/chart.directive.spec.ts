import {ChartDirective} from './chart.directive';
import {ElementRef} from '@angular/core';
import {quotations} from '../../connection.service.spec';

describe('ChartDirective', () => {
    let directive: ChartDirective;

    beforeEach(() => {
        directive = new ChartDirective({nativeElement: new ElementRef(HTMLDivElement)} as ElementRef);
        directive.quotations = quotations[0].quotations;
    });
    it('should create an instance', () => {

        directive.ngOnInit();
        expect(directive).toBeTruthy();
    });
    it('should generate labels and values', () => {
        expect(directive.labels).toBeUndefined();


        directive.ngOnInit();

        expect(directive.labels).toBeDefined();
    });
});
