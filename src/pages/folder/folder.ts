import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FolderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-folder',
  templateUrl: 'folder.html',
})
export class FolderPage {

  url: string = 'dir/'
  directory: any
  cwd: string = 'home'

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.cwd = navParams.get('cwd')
    this.directory = navParams.get('directory')
  }

}
