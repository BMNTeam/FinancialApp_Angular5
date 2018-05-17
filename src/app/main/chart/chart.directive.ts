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


    // TODO: check out performance on sorting

    private labels: string[];
    private values: number[];

    constructor(el: ElementRef) {
        this.elem = el.nativeElement;

    }

    private getLabelsAndValues() {


        this.labels = this.quotations.map(i => new Date(i.time).toLocaleDateString());
        this.values = this.quotations.map(i => i.value);
    }

    ngOnInit() {
        if (!this.chart) { this.initChart(); }
        this.ngOnChanges(); // Needs to show the chart on the first start
    }

    ngOnChanges() {
        if (this.quotations && this.chart) {this.getLabelsAndValues(); } else {return; }

        this.updateChart();
    }

    private initChart() {
        this.chart = new Chart(this.elem, {
            type: 'line',
            options: {
                responsive: true,
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

        this.chart.update();
    }

}
