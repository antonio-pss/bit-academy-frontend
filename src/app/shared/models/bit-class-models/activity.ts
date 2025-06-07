import {ModelBase} from '../core/model-base';

export interface Activity extends ModelBase{
  title?: string;
  description?: string;
  limit_date?: string;
}
