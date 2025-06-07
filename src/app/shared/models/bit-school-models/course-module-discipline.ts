import {ModelBase} from '../core/model-base';

export interface CourseModuleDiscipline extends ModelBase {
  id_course?: number;
  id_module?: number;
  id_discipline?: number;
}
