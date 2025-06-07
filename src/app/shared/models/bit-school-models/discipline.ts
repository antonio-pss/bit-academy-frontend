import {ModelBase} from '../core/model-base';

export interface Discipline extends ModelBase{
  name?: string;
  description?: string;
  workload?: number;
}
