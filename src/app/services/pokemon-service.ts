import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PokedexResponseInterface } from '../interfaces/pokedex-response-interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  POKE_API_BASE_URL = environment.POKE_API_BASE_URL;
  httpClient = inject(HttpClient);

  getPokesByRegion(region: string): Observable<PokedexResponseInterface>{
    return this.httpClient.get<PokedexResponseInterface>(`${this.POKE_API_BASE_URL}/pokedex/${region}`);
  }

}
