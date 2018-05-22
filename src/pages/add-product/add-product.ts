import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { userProducts } from '../../model/product/userProducts.model';
import { ProductListService } from '../../services/product-list.service';

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {

  // User product schema
  product: userProducts = {
    title: '',
    image: 'https://svgshare.com/i/6mt.svg',
    content: ''
  };
  // check were the user is
  type: string; // fridge, freezer or pantry
  // set location of storage
  placeToStore; // fridge, freezer or pantry

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productListService: ProductListService) {
  }

  ionViewDidLoad() {
    this.type = this.navParams.get('type');
  }
  
  addProduct(product: userProducts) {
    var year;
    var month;
    var day;
    if (this.type == "fridge") {
      year = product.content.substr(2, 2);
      month = product.content.substr(5, 2);
      day = product.content.substr(8, 2);
      product.content = day + "-" + month + "-" + year;
      this.productListService.addFridgeProduct(product).then(ref => {
        this.navCtrl.setRoot('HomePage');
      });
    } else if (this.type == "freezer") {
      year = product.content.substr(2, 2);
      month = product.content.substr(5, 2);
      day = product.content.substr(8, 2);
      product.content = day + "-" + month + "-" + year;
      this.productListService.addFreezerProduct(product).then(ref => {
        this.navCtrl.setRoot('HomePage');
      });
    } else if (this.type == "pantry") {
      year = product.content.substr(2, 2);
      month = product.content.substr(5, 2);
      day = product.content.substr(8, 2);
      product.content = day + "-" + month + "-" + year;
      this.productListService.addPantryProduct(product).then(ref => {
        this.navCtrl.setRoot('HomePage');
      });
    }
  }

}
