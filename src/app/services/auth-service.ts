import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(email: string, password: string, callback: (success: boolean, message: string) => void): void {
    setTimeout(() => {
      if(email == 'adrian.rojas@gmail.com' && password == '123456'){
        callback(true, 'Access');
      }else{
        callback(false, 'Credentials are not valid');
      }
    }, 1500);
  }

}
