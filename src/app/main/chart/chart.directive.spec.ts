import { ChartDirective } from './chart.directive';
import {ElementRef} from '@angular/core';

describe('ChartDirective', () => {
  it('should create an instance', () => {
    const directive = new ChartDirective({nativeElement: 'lol'} as ElementRef);
    directive.ngOnInit();
    expect(directive).toBeTruthy();
  });
});
