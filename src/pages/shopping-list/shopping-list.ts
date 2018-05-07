import { Component } from '@angular/core';
import { ActionSheetController, IonicPage, NavController, NavParams } from 'ionic-angular';

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
  public product: NavParams,
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

}
