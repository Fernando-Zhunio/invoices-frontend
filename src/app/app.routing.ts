import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: 'authentication',
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule),
    canActivate: [AuthGuard],
    data: { guard: 'guest' }
  },
  { path: '', redirectTo: 'catalog/brands', pathMatch: 'full' },
  {
    path: '',
    // loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    children: [
      {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'catalog',
        loadChildren: () => import('./modules/products/catalog/catalog.module').then(m => m.CatalogModule),
      }
    ],
    canActivate: [AuthGuard],
    data: { guard: 'auth' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
