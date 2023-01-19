import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandsRoutingModule } from './brands-routing.module';
import { IndexBrandsComponent } from './pages/index-brands/index-brands.component';
import { MatCardModule } from '@angular/material/card';
import { NgxSearchBarModule } from 'ngx-search-bar-fz';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    IndexBrandsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BrandsRoutingModule,
    MatCardModule,
    NgxSearchBarModule
  ]
})
export class BrandsModule { }
