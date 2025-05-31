import {ModelBase} from '../model-base';

const enum ClassTimeRoles {
    DLYD = 'Delayed',
    ABSN = 'Absent',
    JUST = 'Justified',
    PRES = 'Present',
}

export interface Time extends ModelBase{
  id_frequency?: number;
  status?: ClassTimeRoles;
  start_hour?: string;
  end_hour?: string;
}
