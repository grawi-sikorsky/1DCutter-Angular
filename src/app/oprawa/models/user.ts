import { OrderModel } from '../../cutter/models/ordermodel';
export class User {

  id?: string;
  uuid?: string;
  username?: string;
  password?: string;
  role?: string;
  email?: string;
  phone?: string;
  website?: string;
  enabled?: string;
  //accountNonExpired?: boolean;
  //credentialsNonExpired?: boolean;
  //authorities?: string[];
  //accountNonLocked?: boolean;
  activeOrderModel?:OrderModel;
  savedOrderModels?:OrderModel[];
  numberOfSavedItems?:number;
  activeOrderId?:number;
}