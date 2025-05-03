import { Injectable } from '@angular/core';
import {ClassMember} from '../models/class-member';

@Injectable({
  providedIn: 'root'
})
export class TesteService {

  constructor() { }

  private mockClassMembers: ClassMember[] = [
    {
      id_class_role: 2, id_class: 5, id_user: 10,
      active: false
    },
    {
      id_class_role: 3, id_class: 5, id_user: 11,
      active: false
    },
    {
      id_class_role: 4, id_class: 5, id_user: 11,
      active: false
    },
    {
      id_class_role: 5, id_class: 5, id_user: 11,
      active: false
    },
  ];

  getClassMembers(): Promise<ClassMember[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.mockClassMembers), 500);
    });
  }
}
