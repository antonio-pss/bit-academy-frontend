import {ModelBase} from './model-base';

export interface Course extends ModelBase{
  name?: string;
  description?: string;
  id_institution?: number;
}
