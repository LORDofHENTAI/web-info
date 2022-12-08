
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AngularMaterialModule } from './common/models/material-module';
import { LoginPageComponent } from './login-manager/login-page/login-page.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { NgxPrintModule } from 'ngx-print';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SplitPipe } from './pipes/split.pipe';
import { EmptyFormComponent } from './common/components/empty-form/empty-form.component';
import { ProductGroupAccountingFormComponent } from './product-manager/product-group-accounting-form/product-group-accounting-form.component';
import { AttentionFormComponent } from './common/components/dialog-windows/attention-dialog/attention-form/attention-form.component';
import { PlaceListFormComponent } from './product-manager/dialog-windows/place-list-form/place-list-form.component';
import { StoragePlacesEditorComponent } from './product-manager/dialog-windows/storage-places-editor/storage-places-editor.component';
import { PrintLableFormComponent } from './product-manager/dialog-windows/print-lable-form/print-lable-form.component';
import { ExtraCharacteristicComponent } from './product-manager/components/extra-characteristic/extra-characteristic.component';
import { LeavingsComponent } from './product-manager/components/leavings/leavings.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule, MatNativeDateModule, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { CardComponent } from './product-manager/components/card/card.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DischargePrintComponent } from './product-manager/print-forms/discharge-print/discharge-print.component';
import { PricesComponent } from './product-manager/components/prices/prices.component';
import { ProductPitsComponent } from './product-pits-manager/product-pits/product-pits.component';
import { SimpleTagComponent } from './price-tags/simple-tag/simple-tag.component';
import { PrintWindowComponent } from './price-tags/dialog-windows/print-window/print-window.component';
import { ProductCardComponent } from './product-manager/dialog-windows/product-card/product-card.component';
import { ProductPriceListFormComponent } from './product-price-manager/product-price-list-form/product-price-list-form.component';
import { UrlImgPipe } from './pipes/url-img.pipe';
import { ProductOrderingListFormComponent } from './product-ordering-manager/product-ordering-list-form/product-ordering-list-form.component';
import { SelectShopComponent } from './login-manager/select-shop/select-shop.component';
import { SelectCountComponent } from './product-ordering-manager/dialog-windows/select-count/select-count.component';
import { PriceCheckerComponent } from './product-manager/dialog-windows/price-checker/price-checker.component';
import { DatePipe } from '@angular/common';
import { FilterlistPipe } from './pipes/filterlist.pipe';
import { OrderFormComponent } from './product-pits-manager/components/order-form/order-form.component';
import { OrdersListFormComponent } from './product-pits-manager/components/orders-list-form/orders-list-form.component';
import { OrderFilterFormComponent } from './product-pits-manager/components/order-filter-form/order-filter-form.component';
import { OrderBodyListFormComponent } from './product-pits-manager/components/order-body-list-form/order-body-list-form.component';
import { OrderSaveFormComponent } from './product-pits-manager/components/order-save-form/order-save-form.component';
import { StrToDataPipe } from './pipes/str-to-data.pipe';
import { BarcodeImgPipe } from './pipes/barcode-img/barcode-img.pipe';
import { PricePrintDialog } from './product-price-manager/product-price-list-form/product-price-list-form.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PriceSettingsDialogComponent } from './common/components/dialog-windows/price-settings-dialog/price-settings-dialog.component';
import { SafeUrlPipe } from './pipes/safeUrl.pipe';
import { LoadActionComponent } from './common/components/dialog-windows/load-action/load-action.component';
import { RequestProductManagerFormComponent } from './request-product-manager/request-product-manager-form/request-product-manager-form.component'
import { OrderingDialog } from './product-ordering-manager/product-ordering-list-form/product-ordering-list-form.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginPageComponent,
    SplitPipe,
    UrlImgPipe,
    EmptyFormComponent,
    ProductGroupAccountingFormComponent,
    AttentionFormComponent,
    PlaceListFormComponent,
    StoragePlacesEditorComponent,
    PrintLableFormComponent,
    ExtraCharacteristicComponent,
    LeavingsComponent,
    CardComponent,
    DischargePrintComponent,
    PricesComponent,
    ProductPitsComponent,
    SimpleTagComponent,
    PrintWindowComponent,
    ProductCardComponent,
    ProductPriceListFormComponent,
    ProductOrderingListFormComponent,
    SelectShopComponent,
    SelectCountComponent,
    PriceCheckerComponent,
    FilterlistPipe,
    OrderFormComponent,
    OrdersListFormComponent,
    OrderFilterFormComponent,
    OrderBodyListFormComponent,
    OrderSaveFormComponent,
    StrToDataPipe,
    BarcodeImgPipe,
    PricePrintDialog,
    PriceSettingsDialogComponent,
    SafeUrlPipe,
    LoadActionComponent,
    RequestProductManagerFormComponent,
    OrderingDialog
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    AngularMaterialModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgxPrintModule,
    NgScrollbarModule,
    MatToolbarModule
  ],
  exports: [AngularMaterialModule],
  providers: [
    Title,
    DatePipe,
    HttpClient,
    CookieService,
    NavbarComponent,
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
  ],
  entryComponents: [
    AttentionFormComponent,
    PlaceListFormComponent,
    StoragePlacesEditorComponent,
    PrintLableFormComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
