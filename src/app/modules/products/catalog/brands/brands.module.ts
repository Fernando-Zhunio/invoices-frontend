import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandsRoutingModule } from './brands-routing.module';
import { IndexBrandsComponent } from './pages/index-brands/index-brands.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    IndexBrandsComponent
  ],
  imports: [
    CommonModule,
    BrandsRoutingModule,
    MatCardModule,
  ]
})
export class BrandsModule { }
