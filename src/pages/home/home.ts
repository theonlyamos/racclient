import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  info : any;

  constructor(public navCtrl: NavController, public api: ApiProvider) {

  }

  ngOnInit() {
    this.api.getInfo().subscribe(res => {
      this.info = res
    })
  }

  toFixed(inf: number): number {
    return parseFloat(inf.toFixed(2))
  }

}
