import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FirebaseApp } from "angularfire2";
import { Inject } from "@angular/core";

import { Chart } from 'chart.js';

/**
 * Generated class for the StatisticsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {

  @ViewChild('doughnutCanvas') doughnutCanvas;

  doughnutChart: any;
  eatenProducts: any;
  wastedProducts: any;
  priceOfWastedProducts: number;
  footprintIpactStatus: any;
  footprintTree: String;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    @Inject(FirebaseApp) public fb: any) {
  }

  ionViewDidLoad() {
    
    var eaten;
    var wasted;
    const ref = this.fb.database().ref();
    ref.child('/eaten-products-list').once('value').then(
      (snapshot) => {
        eaten = snapshot.numChildren(); // gets eaten list length
        this.eatenProducts = eaten;
      });
          
    ref.child('/wasted-products-list').once('value').then(
      (snapshot) => {
        wasted = snapshot.numChildren(); // gets wasted list length
        this.wastedProducts = wasted;
        this.priceOfWastedProducts = eaten - wasted * 1,35;
        this.footprintIpactStatus = (100*eaten) / (eaten+wasted);
        this.footprintIpactStatus = this.footprintIpactStatus.toFixed(2);
        if(this.footprintIpactStatus >= 90) {
          this.footprintTree = "https://svgshare.com/i/6kE.svg";
        } else if(this.footprintIpactStatus >= 75) {
          this.footprintTree = "https://svgshare.com/i/6m1.svg";
        } else if(this.footprintIpactStatus >= 60) {
          this.footprintTree = "https://svgshare.com/i/6kr.svg";
        } else {
          this.footprintTree = "https://svgshare.com/i/6m2.svg";
        }

        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
          
          type: 'doughnut',
          data: {
              labels: ["Eaten", "Wasted"],
              datasets: [{
                  label: '# of Votes',
                  data: [eaten, wasted],
                  backgroundColor: [
                      'rgba(25, 240, 166, 1)',
                      '#d2d2d2'
                  ],
                  hoverBackgroundColor: [
                      "#19F0A6",
                      "#d2d2d2"
                  ],
                  borderWidth: [
                    10,
                    10
                  ]
              }]
          }
        });
      }
    );
  }

}
