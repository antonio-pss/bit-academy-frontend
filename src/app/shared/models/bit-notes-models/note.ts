import {ModelBase} from '../core/model-base';

export interface Note extends ModelBase{
  id_user?: number;
  title?: string;
  content?: string;
}
