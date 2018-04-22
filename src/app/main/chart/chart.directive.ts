import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import * as Chart from 'chart.js';

@Directive({
    selector: '[appChart]'
})
export class ChartDirective implements OnInit {
    @Input() values: number[];
    @Input() labels: string[];
    elem: HTMLCanvasElement;
    chart: Chart;

    constructor(el: ElementRef) {
        this.elem = el.nativeElement;
    }

    ngOnInit() {
        this.chart = new Chart(this.elem, {
            type: 'line',
            data: {
                labels: this.labels,
                datasets: [{
                    // label: '# of Votes',
                    data: this.values,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }

        });
    }

}
