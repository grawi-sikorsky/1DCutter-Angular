import { CutList, StockList, OrderModel } from '../../cutter/models/ordermodel';
import { CutOptions } from '../../cutter/models/cutoptions';
export class User {

  id?: string;
  username?: string;
  password?: string;
  role?: string;
  email?: string;
  phone?: string;
  website?: string;
  enabled?: string;
  accountNonExpired?: boolean;
  credentialsNonExpired?: boolean;
  authorities?: string[];
  accountNonLocked?: boolean;
  activeOrderModel?:OrderModel;
}