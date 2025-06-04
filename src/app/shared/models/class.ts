import { ModelBase } from './model-base';
import {WeekDay} from './week-day';

export interface Classroom extends ModelBase {
  name: string;
  description: string;
  days_per_week: WeekDay[];
  days_display?: string[];
  hours_per_class: number;
  teacher: number;
}
