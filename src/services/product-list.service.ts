import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { userProducts } from '../model/product/userProducts.model';
import { Products } from '../model/product/products.model';
import { ShoppingList } from '../model/product/shoppingList.model';

@Injectable()
export class ProductListService {

    private userProductsListRef = this.db.list<userProducts>('products-list');
    private productRef = this.db.list<Products>('products');
    private shoppingListRef = this.db.list<ShoppingList>('shopping-list');

    constructor(private db: AngularFireDatabase) { }

    // User product functions 
    getProductList() {
        return this.userProductsListRef;
    }

    addProduct(product: userProducts) {
        return this.userProductsListRef.push(product);
    }

    updateProduct(product: userProducts) {
        return this.userProductsListRef.update(product.key, product);
    }

    removeProduct(product: userProducts) {
        return this.userProductsListRef.remove(product.key);
    }

    // Main products functions
    getUserProducts() {
        return this.productRef;
    }


    // Shoping list functions 
    getShoppingList() {
        return this.shoppingListRef;
    }

    addProductToShoppingList(product: ShoppingList) {
        return this.shoppingListRef.push(product);
    }

}