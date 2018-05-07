import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController, NavParams} from 'ionic-angular';

import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Observable } from 'rxjs/Observable';
import { userProducts } from '../../model/product/userProducts.model';
import { ProductListService } from '../../services/product-list.service';
import { EditProductPage } from '../edit-product/edit-product';
import { ShoppingList } from '../../model/product/shoppingList.model';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  type: string = "fridge";
  productList: Observable<userProducts[]>; 
  // Prepare 
  userListProducts: userProducts = {
    title: '',
    image: '',
    content: ''
  };
  shoppingListProduct: ShoppingList = {
    image: '',
    name: ''
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public actionSheetCtrl: ActionSheetController, 
    public product: NavParams,
    private productListService: ProductListService) {
      this.productList = this.productListService.getProductList()
        .snapshotChanges()
        .map(
        changes => {
          return changes.map(c => ({
            key: c.payload.key, ...c.payload.val()
          }))
        });
    }

  presentActionSheet(key, title, image, content) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What have you just done to that delicious food?',
      buttons: [
        {
          text: 'I wasted it',
          role: 'destructive',
          handler: () => {
            this.userListProducts.key = key;
            this.userListProducts.title = title;
            this.userListProducts.content = content;
            this.shoppingListProduct.name = title;
            this.shoppingListProduct.image = image;
            this.productListService.addProductToShoppingList(this.shoppingListProduct);
            this.productListService.removeProduct(this.userListProducts);
          }
        },{
          text: 'I ate it',
          handler: () => {
            this.userListProducts.key = key;
            this.userListProducts.title = title;
            this.userListProducts.content = content;
            this.shoppingListProduct.name = title;
            this.shoppingListProduct.image = image;
            this.productListService.addProductToShoppingList(this.shoppingListProduct);
            this.productListService.removeProduct(this.userListProducts);
          }
        },{
          text: 'Edit it',
          handler: () => {
            this.userListProducts.key = key;
            this.userListProducts.title = title;
            this.userListProducts.image = image;
            this.userListProducts.content = content;
            this.navCtrl.push(EditProductPage, {
              product: this.userListProducts
            });
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  
}