import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  info : any;
  home: string = '/home/void/'
  windows: string[]
  favourites: any = [{name: 'Desktop', path: this.home+'Desktop'},
                     {name: 'Downloads', path: this.home+'Downloads'},
                     {name: 'Documents', path: this.home+'Documents'},
                     {name: 'Pictures', path: this.home+'Pictures'},
                     {name: 'Videos', path: this.home+'Videos'},
]

  constructor(public navCtrl: NavController, public api: ApiProvider,
    public actionSheetCtrl: ActionSheetController
  ) {

  }

  ngOnInit() {
    this.api.home().subscribe(res => {
      this.info = res
    })
  }

  toFixed(inf: number): number {
    return parseFloat(inf.toFixed(2))
  }

  getActiveWindows() {
    this.api.getInfo('info/windows').subscribe(res => {
      this.windows = res

      var actionSheet = this.actionSheetCtrl.create({})
      actionSheet.setTitle('Active Windows [' + this.windows.length + ']')
      this.windows.forEach(win => {
        actionSheet.addButton({
          icon: 'albums',
          text: win.trim(),
          handler: () => {
            console.log(win.trim())
          }
        })
      });
      actionSheet.present()
    })
  }

}
