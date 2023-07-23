import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ChartInterface {
  id?: string;
  simulation: number;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface ChartGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
