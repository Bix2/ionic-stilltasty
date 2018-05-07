import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController, NavParams} from 'ionic-angular';

import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../model/product/product.model';
import { Products } from '../../model/product/products.model';
import { ProductListService } from '../../services/product-list.service';
import { EditProductPage } from '../edit-product/edit-product';
import { ShoppingListPage } from '../shopping-list/shopping-list';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  type: string = "fridge";
  productList: Observable<Product[]>; 

  public pro: Product = {
    title: '',
    content: ''
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

  presentActionSheet(key, title, content) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What have you just done to that delicious food?',
      buttons: [
        {
          text: 'I wasted it',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'I ate it',
          handler: () => {
            this.pro.key = key;
            this.pro.title = title;
            this.pro.content = content;
          }
        },{
          text: 'Edit it',
          handler: () => {
            this.pro.key = key;
            this.pro.title = title;
            this.pro.content = content;
            this.navCtrl.push(EditProductPage, {
              product: this.pro
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