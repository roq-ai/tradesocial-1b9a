import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface StatsInterface {
  id?: string;
  gain: number;
  fail_success_ratio: number;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface StatsGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
