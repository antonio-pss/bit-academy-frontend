import {ModelBase} from './model-base';

export interface Classroom extends ModelBase{
  name?: string;
  description?: string;
  schedule?: string[];
  hours_per_week?: number;
  id_course_module_discipline?: number;
}
