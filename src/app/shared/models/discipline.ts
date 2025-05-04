import {ModelBase} from './model-base';

export interface Discipline extends ModelBase{
  name?: string;
  description?: string;
  workload?: number;
}
