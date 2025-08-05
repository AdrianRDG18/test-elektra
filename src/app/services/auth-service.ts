import { inject, Injectable } from '@angular/core';
import { CryptoService } from '../utils/crypto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  cryptoService = inject(CryptoService);

  login(email: string, password: string, callback: (success: boolean, message: string) => void): void {
    setTimeout(() => {

      if(email == 'adrian.rojas@gmail.com' && password == '123456'){

        const emailEncrypted = this.cryptoService.encrypt(email);
        const passwordEncrypted = this.cryptoService.encrypt(password);

        localStorage.setItem('loggedUser', JSON.stringify({
          email: emailEncrypted,
          password: passwordEncrypted
        }));
        callback(true, 'Access');

      }else{
        callback(false, 'Credentials are not valid');
      }
    }, 1500);
  }

}
