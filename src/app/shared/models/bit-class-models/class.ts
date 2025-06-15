import { ModelBase } from '../core/model-base';

export enum WeekDays {
  MONDAY = 'Seg',
  TUESDAY = 'Ter',
  WEDNESDAY = 'Qua',
  THURSDAY = 'Qui',
  FRIDAY = 'Sex',
  SATURDAY = 'Sab',
  SUNDAY = 'Dom',
}

export interface Class extends ModelBase {
  id: number;
  name: string;
  description: string;
  days_per_week: string;
  hours_per_class: number;
  days_display?: string[]; // Propriedade opcional para a exibição dos dias

  total_students: number;
  total_activities: number;
  average_grade: number;
  attendance_rate: number;
}
