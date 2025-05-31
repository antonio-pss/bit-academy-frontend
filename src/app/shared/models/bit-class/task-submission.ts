import {ModelBase} from '../model-base';

export interface TaskSubmission extends ModelBase{
  id_activity: number;
  id_class_member: number;
  text_response?: string;
  file_upload?: string;
  delivered: boolean;
}
