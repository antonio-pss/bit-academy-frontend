import {ModelBase} from './model-base';

export interface Time extends ModelBase{
  id_frequency: number;
  id_status: number;
  start_hour: string;
  end_hour: string;
}
