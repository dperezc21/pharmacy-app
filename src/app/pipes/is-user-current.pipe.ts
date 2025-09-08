import { Pipe, PipeTransform } from '@angular/core';
import {User} from '../models/user.models';

@Pipe({
  standalone: true,
  name: 'isUserCurrent'
})
export class IsUserCurrentPipe implements PipeTransform {

  transform(userCurrent: User | null, listUserId: number): boolean {
    return userCurrent?.id === listUserId;
  }

}
