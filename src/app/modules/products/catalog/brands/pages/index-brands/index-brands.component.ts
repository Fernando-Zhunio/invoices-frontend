import { Component, OnInit } from '@angular/core';
import { NgxSearchBarFilter } from 'ngx-search-bar-fz';
import { ResponseApi, ResponsePagination } from 'src/app/shared/interfaces/response';
import { MethodsHttpService } from 'src/app/shared/services/methods-http.service';
import { Brand } from '../../interfaces/brand';

@Component({
  templateUrl: './index-brands.component.html',
  styleUrls: ['./index-brands.component.scss']
})
export class IndexBrandsComponent {

  constructor(private methods : MethodsHttpService) { }

  brands: Brand[] = []
  filters: NgxSearchBarFilter = {
    name: {
      friendlyName: 'Nombre',
      value: '',
    },
    address: {
      friendlyName: 'Dirección',
      value: '',
    },
  }

  getData(event: unknown) {
    const events = event as ResponsePagination<Brand>
    this.brands = events.data.results;
  }
}
