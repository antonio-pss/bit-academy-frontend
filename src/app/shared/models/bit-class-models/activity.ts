import {ModelBase} from '../core/model-base';
import {Class} from './class';

export interface Activity extends ModelBase {
  id: number;
  class_id: Class;
  name: string;
  description: string;
  value: number;
  due_date: Date;
}
