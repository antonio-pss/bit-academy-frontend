import { Component, Input } from '@angular/core';
import { Activity } from '../../../../../shared/models/bit-class-models/activity';
import {MATERIAL_IMPORTS} from "../../../../../shared/imports/material.imports";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  imports: [
    MATERIAL_IMPORTS,
    DatePipe
  ],
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent {
  @Input() activities: Activity[] = [];

  trackByActivityId(index: number, item: Activity): number {
    return item.id;
  }
}
