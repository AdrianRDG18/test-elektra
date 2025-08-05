import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { Component, inject, OnInit, signal } from '@angular/core';
import { PokemonService } from '../../services/pokemon-service';
import { PokemonResponseInterface } from '../../interfaces/pokemon-response-interface';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, TitleCasePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-details-page',
  imports: [AsyncPipe, TitleCasePipe, UpperCasePipe],
  templateUrl: './pokemon-details-page.html',
  styles: ``
})
export class PokemonDetailsPage implements OnInit {

  route = inject(ActivatedRoute);
  pokemonService = inject(PokemonService);
  pokemon$!: Observable<PokemonResponseInterface | null>;
  cardColor = signal<string>('#ffffff');

  ngOnInit(): void {

    this.pokemon$ = this.route.paramMap.pipe(
      map(params => params.get('name')!),
      switchMap(name => {

        return this.pokemonService.getPokemonDetails(name).pipe(
          catchError(error => {
            console.log('Something went wrong trying getPokemonDetails',  error);
            return of(null);
          })
        );
      })
    );
  }

  changeColor(){
    const colorRnd = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    this.cardColor.set(colorRnd);
  }

}
