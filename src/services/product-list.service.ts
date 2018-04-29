import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from '../model/product/product.model';

@Injectable()
export class ProductListService {

    private productListRef = this.db.list<Product>('products-list');

    constructor(private db: AngularFireDatabase) { }

    getProductList() {
        return this.productListRef;
    }

    addProduct(product: Product) {
        return this.productListRef.push(product);
    }

    updateProduct(product: Product) {
        return this.productListRef.update(product.key, product);
    }

    removeProduct(product: Product) {
        return this.productListRef.remove(product.key);
    }
}