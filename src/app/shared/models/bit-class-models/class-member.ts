import { ModelBase } from '../core/model-base';
import { Class } from './class';
import { User } from '../core/user'

export enum ClassMemberRole {
  STUDENTS = 'STD',
  TEACHERS = 'TEA',
  PRINCIPAL = 'PRI',
  TRAINEE = 'TRA',
}

export interface ClassMember extends ModelBase {
  id: number;
  class_id: Class;
  user_id: User;
  role: ClassMemberRole;
  joined_at: Date;
}
