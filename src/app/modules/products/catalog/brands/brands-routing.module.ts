import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexBrandsComponent } from './pages/index-brands/index-brands.component';

const routes: Routes = [
  {
    'path': '',
    component: IndexBrandsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandsRoutingModule { }
