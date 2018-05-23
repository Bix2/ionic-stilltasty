import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { userProducts } from '../../model/product/userProducts.model';
import { ProductListService } from '../../services/product-list.service';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  public listBarcodesParsed = Array();
  public listBarcodes: any;
  public date: string;
  public productList: any;
  public data;
  public pro: userProducts = {
    title: '',
    image: '',
    content: ''
  };



  constructor(
    private toastCtrl: ToastController, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private productListService: ProductListService) {

    this.productList = this.productListService.getProducts()
      .snapshotChanges()
      .map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      })
      .subscribe(data => {
        this.data = data;
      });
      
    this.listBarcodes = navParams.get('data');
    var year;
    var month;
    var day;
    
    for (let index = 0; index < this.listBarcodes.length; index++) {
      if(this.listBarcodes[index].substr(0, 2) == "01") {
        var product = this.listBarcodes[index].substr(2, 14);
      }
      if(product == "05400141382914") {
        year = "19";
        month = "11";
        day = "10";
      }
      else if (this.listBarcodes[index].indexOf("17") == -1) {
        this.date = this.listBarcodes[index].split('15');
        year = this.date[1].substr(0, 2);
        month = this.date[1].substr(2, 2);
        day = this.date[1].substr(4, 2);
      } else {
        // 3103001328
        this.date = this.listBarcodes[index].split('17');
        year = this.date[1].substr(0, 2);
        month = this.date[1].substr(2, 2);
        day = this.date[1].substr(4, 2);
      }
     
      
      var productObject = {
        product: product,
        //date: year + "/" + month + "/" + day
        date: day + "-" + month + "-" + year
      }

      this.listBarcodesParsed.push(productObject);
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

  addProduct(storage, title, image, content) {
    this.pro.title = title,
    this.pro.image = image,
    this.pro.content = content
    // Add product to the right location based on the storage type
    if(storage == "fridge") {
      this.productListService.addFridgeProduct(this.pro);
    } else if(storage == "freezer") {
      this.productListService.addFreezerProduct(this.pro);
    } else if(storage == "pantry") {
      this.productListService.addPantryProduct(this.pro);
    }
    this.showToast("bottom");
  }

  showToast(position: string) {
    const toast = this.toastCtrl.create({
      message: 'Product has been added',
      position: position,
      showCloseButton: true,
      duration: 2000
    });

    toast.present();
  }

  removeProduct(product){
    let index = this.listBarcodesParsed.indexOf(product);
    if(index > -1){
      this.listBarcodesParsed.splice(index, 1);
      if (this.listBarcodesParsed.length == 0) {
        document.getElementById("btn-done").style.display = "block";
      }
    }
  }

  backToHome() {
    this.navCtrl.setRoot('HomePage');
  }
}

