import { Component, OnInit } from '@angular/core';
import { MethodsHttpService } from 'src/app/shared/services/methods-http.service';
import { Brand } from '../../interfaces/brand';

@Component({
  templateUrl: './index-brands.component.html',
  styleUrls: ['./index-brands.component.scss']
})
export class IndexBrandsComponent implements OnInit {

  constructor(private methods : MethodsHttpService) { }

  brands: Brand[] = []
  ngOnInit(): void {
    this.methods.methodGetPaginate('brands', {pageSize: 15, page: 1}).subscribe((res) => {
      if (res?.success) {
        this.brands = res.data.results;
        console.log(this.brands);
      }
    });
  }
}
