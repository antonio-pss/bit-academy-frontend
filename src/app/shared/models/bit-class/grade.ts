import {ModelBase} from '../model-base';

export interface Grade extends ModelBase{
  score: number;
  id_task_submission: number;
}
