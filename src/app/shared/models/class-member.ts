import {ModelBase} from './model-base';

export interface ClassMember extends ModelBase{
  id_class_role?: number;
  id_class?: number;
  id_user?: number;
}
