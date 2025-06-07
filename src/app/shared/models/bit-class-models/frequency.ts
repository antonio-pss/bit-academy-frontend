import {ModelBase} from '../core/model-base';
import {ClassMember} from './class-member';

export interface Attendance extends ModelBase {
  id: number;
  class_member: ClassMember;
  date: Date;
  is_present: boolean;
  registered_at: Date;
  registered_by: ClassMember;
}
