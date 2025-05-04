import {ModelBase} from './model-base';

export interface Activity extends ModelBase{
  title?: string;
  description?: string;
  limit_date?: string;
}
