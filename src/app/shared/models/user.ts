import {ModelBase} from './model-base';

export interface User extends ModelBase {
  name: string;
  username: string;
  email: string;
  xp: number;
  streak: number;
}
