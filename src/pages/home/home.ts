import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController, NavParams} from 'ionic-angular';

import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Observable } from 'rxjs/Observable';
import { userProducts } from '../../model/product/userProducts.model';
import { ProductListService } from '../../services/product-list.service';
import { EditProductPage } from '../edit-product/edit-product';
import { ScanProductPage } from '../scan-product/scan-product';
import { AddProductPage } from '../add-product/add-product';
import { ShoppingList } from '../../model/product/shoppingList.model';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  type: string = "fridge";
  fridgeProductList: Observable<userProducts[]>; 
  freezerProductList: Observable<userProducts[]>; 
  pantryProductList: Observable<userProducts[]>; 
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
      // get items in the fridge
      this.fridgeProductList = this.productListService.getFridgeProductList()
        .snapshotChanges()
        .map(
        changes => {
          return changes.map(c => ({
            key: c.payload.key, ...c.payload.val()
          }))
        });

      // get items in de freezer
      this.freezerProductList = this.productListService.getFreezerProductList()
        .snapshotChanges()
        .map(
        changes => {
          return changes.map(c => ({
            key: c.payload.key, ...c.payload.val()
          }))
        });

      // get items in de pantry
      this.pantryProductList = this.productListService.getPantryProductList()
        .snapshotChanges()
        .map(
        changes => {
          return changes.map(c => ({
            key: c.payload.key, ...c.payload.val()
          }))
        });
    }

  presentActionSheet(type, key, title, image, content) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose food item options',
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
            this.productListService.addProductToWastedProductsList(this.shoppingListProduct);
            this.productListService.addProductToShoppingList(this.shoppingListProduct);
            // check location and remove item
            if (type == "fridge") {
              this.productListService.removeFridgeProduct(this.userListProducts);
            } else if (type == "freezer") {
              this.productListService.removeFreezerProduct(this.userListProducts);
            } else if (type == "pantry") {
              this.productListService.removePantryProduct(this.userListProducts);
            }
          }
        },{
          text: 'I ate it',
          handler: () => {
            this.userListProducts.key = key;
            this.userListProducts.title = title;
            this.userListProducts.content = content;
            this.shoppingListProduct.name = title;
            this.shoppingListProduct.image = image;
            this.productListService.addProductToEatenProductsList(this.shoppingListProduct);
            this.productListService.addProductToShoppingList(this.shoppingListProduct);
            // check location and remove item
            if (type == "fridge") {
              this.productListService.removeFridgeProduct(this.userListProducts);
            } else if (type == "freezer") {
              this.productListService.removeFreezerProduct(this.userListProducts);
            } else if (type == "pantry") {
              this.productListService.removePantryProduct(this.userListProducts);
            }
          }
        },{
          text: 'Edit it',
          handler: () => {
            this.userListProducts.key = key;
            this.userListProducts.title = title;
            this.userListProducts.image = image;
            this.userListProducts.content = content;
            this.navCtrl.push(EditProductPage, {
              product: this.userListProducts,
              type: type
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

  presentActionSheetAddProduct(type) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose adding option',
      buttons: [
        {
          text: 'Scan',
          handler: () => {
            this.startScan();
          }
        },{
          text: 'Manually',
          handler: () => {
            this.navCtrl.push(AddProductPage, {
              type: type
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

  startScan() {
    this.navCtrl.push(ScanProductPage);
  }
  
}