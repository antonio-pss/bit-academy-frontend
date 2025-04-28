import {ModelBase} from './model-base';

export interface TaskSubmission extends ModelBase{
  id_activity: number;
  text_response: string;
  file_upload: string;
}
