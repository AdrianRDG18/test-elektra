import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { PokemonService } from '../../services/pokemon-service';
import { PokemonResponseInterface } from '../../interfaces/pokemon-response-interface';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, NgClass, TitleCasePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-details-page',
  imports: [AsyncPipe, TitleCasePipe, UpperCasePipe, NgClass],
  templateUrl: './pokemon-details-page.html',
  styles: `
    .card-animation {
      transition: background-color 0.4s ease-in-out, transform 0.2s ease-in-out;
      transform: scale(1.2);
    }
    .card-normal {
      transform: scale(1);
    }
  `
})
export class PokemonDetailsPage implements OnInit {

  route = inject(ActivatedRoute);
  pokemonService = inject(PokemonService);
  pokemon$!: Observable<PokemonResponseInterface | null>;
  cardColor = signal<string>('#ffffff');
  isAnimated = signal(false);

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

  changeColorEffect = effect(() => {
    this.isAnimated.set(true);

    setTimeout(() => {
      this.isAnimated.set(false);
    }, 200);

    console.log('Card color changed:', this.cardColor());
  });

}
