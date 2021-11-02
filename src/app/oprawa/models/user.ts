import { ProjectModel } from '../../cutter/models/projectmodel';
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

  activeProjectModel?:ProjectModel;
  savedProjectModels?:ProjectModel[];
  numberOfSavedItems?:number;
  activeProjectId?:number;
}