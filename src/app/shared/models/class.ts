import {ModelBase} from './model-base';

export interface Class extends ModelBase{
  name?: string;
  description?: string;
  id_course_module_discipline?: number;
}
