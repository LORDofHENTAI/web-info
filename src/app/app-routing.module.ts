import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-manager/login-page/login-page.component';
import { EmptyFormComponent } from './common/components/empty-form/empty-form.component';
import { ProductGroupAccountingFormComponent } from './product-manager/product-group-accounting-form/product-group-accounting-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  // { path: '', redirectTo: '/prices', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'products', component: ProductGroupAccountingFormComponent },
  { path: 'empty', component: EmptyFormComponent },
  { 
    path: 'prices', 
    loadChildren: () => import('./price-manager/price/price.module').then(m => m.PriceModule) 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
