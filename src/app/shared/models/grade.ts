import {ModelBase} from './model-base';

export interface Grade extends ModelBase{
  score: number;
  id_class_member: number;
  id_activity: number;
}
