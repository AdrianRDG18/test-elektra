import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RegionsService } from '../../services/regions-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Region, RegionsResponse } from '../../interfaces/regions-response-interface';
import { SweetAlertService } from '../../services/swal-service';
import Swal from 'sweetalert2';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-navbar-component',
  imports: [RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './navbar-component.html',
  styles: ``
})
export class NavbarComponent implements OnInit {

  regionsService = inject(RegionsService);
  swal = inject(SweetAlertService);
  regions = signal<Region[]>([]);

  ngOnInit(){
    this.getRegions();
  }

  getRegions(){
    this.swal.swalProcessingRequest();
    Swal.showLoading();
    this.regionsService.getRegions().subscribe({
      next: (resp) => this.regions.set(resp.results),
      error: (error) => {
        console.log(error);
        this.swal.swalError('Something went wrong in getRegions func', error);
      }, complete: () => Swal.close()
    });
  }

  regionsResource = rxResource({
    stream: () => this.regionsService.getRegions()
  });
}
