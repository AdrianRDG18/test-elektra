import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar-component/navbar-component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pokemon-dashboard-page',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './pokemon-dashboard-page.html',
  styles: ``
})
export class PokemonDashboardPage {

}
