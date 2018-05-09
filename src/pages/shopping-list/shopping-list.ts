import { Component } from '@angular/core';
import { ActionSheetController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { ShoppingList } from '../../model/product/shoppingList.model';
import { ProductListService } from '../../services/product-list.service';
/**
 * Generated class for the ShoppingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingList: Observable<ShoppingList[]>;

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams, 
  public actionSheetCtrl: ActionSheetController, 
  private toastCtrl: ToastController,
  private productListService: ProductListService) {
    this.shoppingList = this.productListService.getShoppingList()
      .snapshotChanges()
      .map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
  }

  removeAllItems(shoppingList) {
    // this.shoppingList is an Observable
    shoppingList.subscribe(products => {
      // items is an array
      products.forEach(product => {
          this.productListService.removeProductsFromShoppingList(product);
      });
      this.showToast("bottom");
    });
  }

  showToast(position: string) {
    const toast = this.toastCtrl.create({
      message: 'Products removed from shopping list',
      position: position,
      showCloseButton: true,
      duration: 2000
    });

    toast.present();
  }

}
