import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { userProducts } from '../model/product/userProducts.model';
import { Products } from '../model/product/products.model';
import { ShoppingList } from '../model/product/shoppingList.model';
import { EatenProductsList } from '../model/product/eatenProducts.model';
import { WastedProductsList } from '../model/product/wastedProducts.model';

@Injectable()
export class ProductListService {

    private freezerListRef = this.db.list<userProducts>('freezer');
    private fridgeListRef = this.db.list<userProducts>('fridge');
    private pantryListRef = this.db.list<userProducts>('pantry');
    private productRef = this.db.list<Products>('products');
    private shoppingListRef = this.db.list<ShoppingList>('shopping-list');
    private eatenProductsRef = this.db.list<EatenProductsList>('eaten-products-list');
    private wastedProductsRef = this.db.list<WastedProductsList>('wasted-products-list');

    constructor(private db: AngularFireDatabase) { }

    // Freezer product functions 
    getFreezerProductList() {
        return this.freezerListRef;
    }

    addFreezerProduct(product: userProducts) {
        return this.freezerListRef.push(product);
    }

    updateFreezerProduct(product: userProducts) {
        return this.freezerListRef.update(product.key, product);
    }

    removeFreezerProduct(product: userProducts) {
        return this.freezerListRef.remove(product.key);
    }

    // Fridge product functions 
    getFridgeProductList() {
        return this.fridgeListRef;
    }

    addFridgeProduct(product: userProducts) {
        return this.fridgeListRef.push(product);
    }

    updateFridgeProduct(product: userProducts) {
        return this.fridgeListRef.update(product.key, product);
    }

    removeFridgeProduct(product: userProducts) {
        return this.fridgeListRef.remove(product.key);
    }

    // Pantry product functions 
    getPantryProductList() {
        return this.pantryListRef;
    }

    addPantryProduct(product: userProducts) {
        return this.pantryListRef.push(product);
    }

    updatePantryProduct(product: userProducts) {
        return this.pantryListRef.update(product.key, product);
    }

    removePantryProduct(product: userProducts) {
        return this.pantryListRef.remove(product.key);
    }

    // Main products functions
    getProducts() {
        return this.productRef;
    }


    // Shoping list functions 
    getShoppingList() {
        return this.shoppingListRef;
    }

    addProductToShoppingList(product: ShoppingList) {
        return this.shoppingListRef.push(product);
    }

    removeProductsFromShoppingList(product: ShoppingList) {
        return this.shoppingListRef.remove(product.key);
    }

    // Wasted products list functions 
    addProductToEatenProductsList(product: EatenProductsList) {
        return this.eatenProductsRef.push(product);
    }

    // Eaten products list functions 
    addProductToWastedProductsList(product: WastedProductsList) {
        return this.wastedProductsRef.push(product);
    }

}