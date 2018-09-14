import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-explorer',
  templateUrl: 'explorer.html',
})
export class ExplorerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ApiProvider) {
  }


}
