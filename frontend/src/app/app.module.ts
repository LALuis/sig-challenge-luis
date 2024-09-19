import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductDetailComponent } from 'src/app/components/product-detail/product-detail.component';
import { ProductListComponent } from 'src/app/components/product-list/product-list.component';
import { CategoryComponent } from 'src/app/components/category/category.component';

@NgModule({
  declarations: [AppComponent, ProductDetailComponent, ProductListComponent, CategoryComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
