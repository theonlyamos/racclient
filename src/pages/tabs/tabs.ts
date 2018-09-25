import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { ExplorerPage } from '../explorer/explorer';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1: any = HomePage;
  tab2: any = ExplorerPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
