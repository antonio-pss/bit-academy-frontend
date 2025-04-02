import {ModelBase} from './model-base';

export interface User extends ModelBase {
  user_id: number
  name: string;
  email: string;
  username: string;
}
