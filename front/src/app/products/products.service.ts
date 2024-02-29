import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "./product.class";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  private static productslist: Product[] = null;
  private products$: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >([]);

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    if (!ProductsService.productslist) {
      this.http
        .get<any>("http://localhost:3000/api/products")
        .subscribe((data) => {
          ProductsService.productslist = data.data;
          console.log(data);
          this.products$.next(ProductsService.productslist);
        });
    } else {
      this.products$.next(ProductsService.productslist);
    }

    return this.products$;
  }

  create(prod: Product): Observable<Product[]> {
     this.http.post<any>('http://localhost:3000/api/products/add', prod).subscribe(
        tap((response: any) => {
            prod.id = response.productId;
            ProductsService.productslist.push(prod);
            this.products$.next([...ProductsService.productslist]);
        })
    );
    return this.products$;

}

  update(prod: Product): Observable<Product[]> {
    ProductsService.productslist.forEach((element) => {
      if (element.id == prod.id) {
        element.name = prod.name;
        element.category = prod.category;
        element.code = prod.code;
        element.description = prod.description;
        element.image = prod.image;
        element.inventoryStatus = prod.inventoryStatus;
        element.price = prod.price;
        element.quantity = prod.quantity;
        element.rating = prod.rating;
      }
    });

    this.http
      .put<Product>(`http://localhost:3000/api/products/update/${prod.id}`, prod)
      .subscribe();
    this.products$.next(ProductsService.productslist);

    return this.products$;
  }

     delete(id: number): Observable<Product[]>{
        this.http.delete<Product>(`http://localhost:3000/api/products/delete/${id}`).subscribe(    
        ); 
        ProductsService.productslist = ProductsService.productslist.filter(value => {
            return value.id !== id 
        } );
        this.products$.next(ProductsService.productslist);
        return this.products$;
    }   
}
