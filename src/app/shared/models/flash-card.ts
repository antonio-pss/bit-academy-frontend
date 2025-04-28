import {ModelBase} from './model-base';

export interface FlashCard extends ModelBase{
  id_user: number;
  question: string;
  answer: string;
}
