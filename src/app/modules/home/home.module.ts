import { NgxSearchBarModule } from 'ngx-search-bar-fz';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { HomeRouting } from './home.routing';
import { MatChipsModule } from '@angular/material/chips';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRouting,
    MatChipsModule,
    NgxSearchBarModule
  ]
})
export class HomeModule { }
