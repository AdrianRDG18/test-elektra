import { Routes } from "@angular/router";
import { PokemonDetailsPage } from "./pokemon-details-page/pokemon-details-page";

export const pageRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pokemon-dashboard-page/pokemon-dashboard-page').then(m => m.PokemonDashboardPage),
    children: [
      {
        path: 'regions/:region',
        loadComponent: () => import('./pokemon-regions-page/pokemon-regions-page').then(m => m.PokemonRegionsPage)
      },
      {
        path: 'pokemon-details/:id',
        loadComponent: () => import('./pokemon-details-page/pokemon-details-page').then(m => PokemonDetailsPage)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
]
export default pageRoutes;
