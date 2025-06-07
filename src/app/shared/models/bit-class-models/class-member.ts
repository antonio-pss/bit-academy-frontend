import {ModelBase} from '../core/model-base';
import {User} from '../core/user';

export interface ClassMember extends ModelBase {
  class_id?: number;
  user_id?: User;
  joined_at?: Date;
  role?: String;
}
