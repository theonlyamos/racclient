import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-folder',
  templateUrl: 'folder.html',
})
export class FolderPage {

  url: string = 'dir/'
  directory: any
  cwd: string = 'home'

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ApiProvider
  ) {
    this.cwd = navParams.get('cwd')
    this.directory = navParams.get('directory')
  }

  openPath(dirType, name) {
    this.api.openPath(this.url, name).subscribe((res: any) => {
      if (dirType == 'folder') {
        this.navCtrl.push(FolderPage, {directory: res, cwd: name})
      }
    })
  }

}
