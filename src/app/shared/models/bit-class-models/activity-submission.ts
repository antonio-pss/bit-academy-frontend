import {ModelBase} from '../core/model-base';

export interface ActivitySubmission extends ModelBase{
  activity?: number;
  student?: number;
  submitted_at?: Date;
  grade?: number;
}
