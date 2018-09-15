import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FolderPage } from '../folder/folder';

import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-explorer',
  templateUrl: 'explorer.html',
})
export class ExplorerPage implements OnInit {

  url: string = 'dir/'
  directory: any
  cwd: string = 'home'

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: ApiProvider) {
  }

  ngOnInit() {
    this.api.openPath(this.url, this.cwd).subscribe(res => {
      this.directory = res
    })
  }

  openPath(dirType, name) {
    this.api.openPath(this.url, name).subscribe((res: any) => {
      if (dirType == 'folder') {
        this.navCtrl.push(FolderPage, {directory: res, cwd: name})
      }
    })
  }
}
