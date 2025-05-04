import {ModelBase} from './model-base';

export interface UserInstitutionRole extends ModelBase {
  id_user?: number;
  id_institution?: number;
  id_institution_role?: number;
  registration?: string;
}
