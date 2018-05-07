import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from '../model/product/product.model';
import { Products } from '../model/product/products.model';
import { ShoppingList } from '../model/product/shoppingList.model';

@Injectable()
export class ProductListService {

    private productListRef = this.db.list<Product>('products-list');
    private productRef = this.db.list<Products>('products');
    private shoppingListRef = this.db.list<ShoppingList>('shopping-list');

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

    getProducts() {
        return this.productRef;
    }

    getShoppingList() {
        return this.shoppingListRef;
    }

}