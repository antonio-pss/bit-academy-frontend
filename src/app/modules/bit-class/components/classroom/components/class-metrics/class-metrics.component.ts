import {Component, Input} from '@angular/core';
import {ClassMetrics} from '../../../../../../shared/models/bit-class-models/class-metrics';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-class-metrics',
  imports: [
    DecimalPipe
  ],
  templateUrl: './class-metrics.component.html',
  styleUrl: './class-metrics.component.scss'
})
export class ClassMetricsComponent {
  @Input({ required: true }) metrics?: ClassMetrics;


}
