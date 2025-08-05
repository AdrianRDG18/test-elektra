import { Routes } from "@angular/router";

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
        path: 'pokemon-details/:name',
        loadComponent: () => import('./pokemon-details-page/pokemon-details-page').then(m => m.PokemonDetailsPage)
      },
      {
        path: 'login',
        loadComponent: () => import('./login-page/login-page').then(m => m.LoginPage)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
]
export default pageRoutes;
