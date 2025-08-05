import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  crypto_key = environment.CRYPTO_KEY;

  encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, this.crypto_key).toString();
  }

  decrypt(data: string): string {
    const bytes = CryptoJS.AES.decrypt(data, this.crypto_key);
    return bytes.toString(CryptoJS.enc.Utf8);

  }

}
