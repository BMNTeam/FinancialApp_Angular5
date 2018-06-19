import {Directive, ElementRef, Input, OnChanges, OnInit} from '@angular/core';
import * as Chart from 'chart.js';
import {Quotation} from '../../connection.service';

@Directive({
    selector: '[appChart]'
})
export class ChartDirective implements OnChanges, OnInit {
    @Input() quotations: Quotation[];
    elem: HTMLCanvasElement;
    chart: Chart;



    labels: string[];
    values: number[];

    constructor(el: ElementRef) {
        this.elem = el.nativeElement;
    }

    private setLabelsAndValues() {

        const proxy = this.quotations
            .map(i => i) // Just make the copy of array
            .sort((a, b) => new Date(a.time).valueOf() - new Date(b.time).valueOf());

        this.labels = proxy.map(i => new Date(i.time).toLocaleDateString());
        this.values = proxy.map(i => i.value);
    }

    ngOnInit() {
        if (!this.chart) { this.initChart(); }
        this.ngOnChanges(); // Needs to show the chart on the first start
    }

    ngOnChanges() {
        if (this.quotations && this.chart) {this.setLabelsAndValues(); } else {return; }

        this.updateChart();
    }

    private initChart() {
        this.chart = new Chart(this.elem, {
            type: 'line',
            options: {
                responsive: true,
                animation: { duration: 0 },
                hover: { animationDuration: 0 },
                responsiveAnimationDuration: 0,
                legend: { display: false },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false,
                        }
                    }]
                }
            }

        });
    }

    private updateChart() {
        this.chart.data.datasets = [
            {
                data: this.values,
                backgroundColor: [ 'rgba(255, 99, 132, 0.2)'],
                borderColor: [ 'rgba(255,99,132,1)'],
                borderWidth: 1
            }];
        this.chart.data.labels = this.labels;

        // TODO find why it leads to settings options of undefined error
        this.chart.update();
    }

}
