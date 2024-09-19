import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Product } from 'src/app/model/product.interface';
import { environment } from 'src/app/environment/environment';
import { map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http: HttpClient = inject(HttpClient);
  categories = new BehaviorSubject<string[]>([]);

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(
      `${environment.backend_url}products/${productId}`
    );
  }

  getProductList(category?: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.backend_url}products`).pipe(
      map((products) => {
        // This get will have a side effect where we will store all the categories in a Behavior Subject
        this.categories.next([... new Set(products.map((product) => product.category))]);
        // Also, if we are filtering by category, we will apply that filter
        return products.filter((product: Product) => {
          return category ? category === product.category : true;
        });
      })
    );
  }

  updateProduct(updatedProduct: Product): Observable<Product> {
    return this.http.post<Product>(
      `${environment.backend_url}products/${updatedProduct.id}`,
      updatedProduct
    );
  }
}
