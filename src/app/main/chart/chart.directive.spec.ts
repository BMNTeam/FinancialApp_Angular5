import {ChartDirective} from './chart.directive';
import {ElementRef} from '@angular/core';
import {quotations} from '../../connection.service.spec';

describe('ChartDirective', () => {
    let directive: ChartDirective;

    beforeEach(() => {
        directive = new ChartDirective({nativeElement: new ElementRef(HTMLCanvasElement)} as ElementRef);
        directive.quotations = quotations[0].quotations;
    });
    it('should create an instance', () => {

        expect(directive).toBeTruthy();
    });
    it('should generate labels and values', () => {
        expect(directive.labels).toBeUndefined();
        expect(directive.values).toBeUndefined();

        // if remove it leads to Cannot set property '_options' of undefined
        directive.initChart();
        spyOn(directive.chart, 'update').and.returnValue(true);

        directive.ngOnInit();

        expect(directive.labels).toBeDefined();
        expect(directive.values).toBeDefined();

    });
});
