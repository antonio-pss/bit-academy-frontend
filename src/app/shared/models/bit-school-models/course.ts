import {ModelBase} from '../core/model-base';

export interface Course extends ModelBase{
  name?: string;
  description?: string;
  id_institution?: number;
}
