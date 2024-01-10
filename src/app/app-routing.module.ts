import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-manager/login-page/login-page.component';
import { EmptyFormComponent } from './common/components/empty-form/empty-form.component';
import { ProductGroupAccountingFormComponent } from './product-manager/product-group-accounting-form/product-group-accounting-form.component';
import { ProductGroupAccountingFormComponentTest } from './product-manager/product-group-accounting-form copy/product-group-accounting-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  // { path: '', redirectTo: '/prices', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'products', component: ProductGroupAccountingFormComponent },
  { path: 'productstest', component: ProductGroupAccountingFormComponentTest },
  { path: 'empty', component: EmptyFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
