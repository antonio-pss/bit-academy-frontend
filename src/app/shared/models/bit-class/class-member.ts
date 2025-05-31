import {ModelBase} from '../model-base';

const enum ClassMemberRole {
  STD = 'student',
  TRN = 'trainee',
  TCHR = 'teacher',
  PRIN = 'Principal'
}

export interface ClassMember extends ModelBase{
  role: ClassMemberRole;
  id_class: number;
  id_user: number;
}
