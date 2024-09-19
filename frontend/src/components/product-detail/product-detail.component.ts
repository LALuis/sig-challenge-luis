import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Product } from 'src/model/product.interface';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  router: ActivatedRoute = inject(ActivatedRoute);
  productService: ProductService = inject(ProductService);

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl({ value: '', disabled: true }),
    price: new FormControl({ value: null, disabled: true }),
    description: new FormControl(''),
    category: new FormControl(''),
    image_url: new FormControl(''),
    discount: new FormControl(null),
  });

  error: string = '';
  loading: boolean = false;
  editMode: boolean = false;

  async ngOnInit(): Promise<void> {
    // Getting the id form the params - Using fistValueFrom to get the params once and don't subscribe for something I will check just at ngOnInit
    const id: string =
      (await firstValueFrom(this.router.paramMap)).get('id') ?? '';
    // Getting the product details
    this.getProductDetails(id);
  }

  getProductDetails(id: string): void {
    // We are loading
    this.loading = true;
    // Cleaning error
    this.error = '';
    // Cleaning the form
    this.form.reset();
    // Subscribes to http requests are automatically unsubscribed onComplete so we don't need to unsusbscribe
    this.productService.getProduct(id).subscribe({
      next: (product: Product) => {
        // Mapping the product values to the form - We use patchValue because sometimes we don't have discount value in some products
        this.form.patchValue(product);
        this.loading = false;
      },
      error: (error) => {
        // The product ID is not valid or something else went wrong, we should throw an error
        this.error =
          error?.error?.error ||
          'An unexpected error occurred. Please try again later.';
        this.loading = false;
      },
    });
  }

  switchEditMode(): void {
    // Enabling the edit mode
    this.editMode = !this.editMode;
    if (this.editMode) {
      // Making the name and prince editable
      this.form.get('price')?.enable();
      this.form.get('name')?.enable();
    } else {
      this.form.get('price')?.disable();
      this.form.get('name')?.disable();
    }
  }

  async updateProduct() {
    this.loading = true;
    this.productService.updateProduct(this.form.getRawValue()).subscribe({
      next: (updatedProduct: Product) => {
        this.form.patchValue(updatedProduct);
        this.switchEditMode();
        this.loading = false;
      },
      error: () => {
        this.error = `We couldn't update your product, please try later`;
        this.switchEditMode();
        this.loading = false;
      },
    });
  }
}
