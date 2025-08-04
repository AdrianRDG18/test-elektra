import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegionsResponse } from '../interfaces/regions-response-interface';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {

  POKE_API_BASE_URL = environment.POKE_API_BASE_URL;
  httpclient = inject(HttpClient);

  getRegions(): Observable<RegionsResponse>{
    return this.httpclient.get<RegionsResponse>(`${this.POKE_API_BASE_URL}/region`);
  }

}
