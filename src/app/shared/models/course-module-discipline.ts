import {ModelBase} from './model-base';

export interface CourseModuleDiscipline extends ModelBase {
  id_course?: number;
  id_module?: number;
  id_discipline?: number;
}
