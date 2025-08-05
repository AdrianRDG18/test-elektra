import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../services/pokemon-service';
import { TitleCasePipe, AsyncPipe, UpperCasePipe } from '@angular/common';
import { map, switchMap, Observable, catchError, of } from 'rxjs';
import { PokemonEntry } from '../../interfaces/pokedex-response-interface';

@Component({
  selector: 'app-pokemon-regions-page',
  imports: [TitleCasePipe, AsyncPipe, UpperCasePipe, RouterLink],
  templateUrl: './pokemon-regions-page.html',
  styles: ``
})
export class PokemonRegionsPage {

  route = inject(ActivatedRoute);
  pokemonService = inject(PokemonService);
  pokemonsCall$!: Observable<PokemonEntry[] | null>;
  region = signal<string>('');
  errorMsg = signal<string>('');

  ngOnInit(): void {

    this.pokemonsCall$ = this.route.paramMap.pipe(
      map(params => params.get('region')!),
      switchMap(region => {

        this.region.set(region);

        return this.pokemonService.getPokesByRegion(region).pipe(
          map(resp => resp.pokemon_entries),
          catchError(error => {
            this.errorMsg.set(error.message)
            console.error('Something went wrong calling getPokesByRegion:', error);
            return of(null);
          })
        );

      })
    );
  }
}
