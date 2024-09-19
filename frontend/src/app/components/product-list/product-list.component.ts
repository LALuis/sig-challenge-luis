import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  // Services
  productService: ProductService = inject(ProductService);
  router: Router = inject(Router);

  // Properties
  form: FormGroup = new FormGroup({
    category: new FormControl(null),
  });

  productList: Product[] = [];
  error: string = '';
  loading: boolean = false;

  ngOnInit(): void {
    this.getProducts();
  }

  goToProductDetail(productId: number): void {
    this.router.navigate(['/products/' + productId]);
  }

  getProducts() {
    // Cleaning errors and loading
    this.error = '';
    this.loading = true;

    // Getting the list of products, we dont need unsubscribe since it's an usual http request and those are self unsubscribed
    this.productService
      .getProductList(this.form.get('category')?.value)
      .subscribe({
        next: (products: Product[]) => {
          this.productList = products;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'An unexpected error occurred. Please try again later.';
          this.loading = false;
        },
      });
  }
}
