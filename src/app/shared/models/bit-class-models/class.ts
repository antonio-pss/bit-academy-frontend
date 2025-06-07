import { ModelBase } from '../core/model-base';

export enum WeekDays {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export interface Class extends ModelBase {
  id: number;
  name: string;
  description: string;
  days_per_week: string; // Ex: "MONDAY,TUESDAY,FRIDAY"
  hours_per_class: number;
  days_display?: string[]; // Propriedade opcional para a exibição dos dias
}
