import {ModelBase} from '../core/model-base';

export interface FlashCard extends ModelBase{
  id_user?: number;
  question?: string;
  answer?: string;
}
