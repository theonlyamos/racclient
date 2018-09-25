import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController, NavParams, PopoverController, ToastController, ViewController } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';

import { KeypadPage } from '../keypad/keypad';

@Component({
  selector: "win-popover",
  templateUrl: 'win-popover.html'
})
export class WinPopOver {

  info: any;
  window: any;
  url: string = 'window/'

  constructor(public viewCtrl: ViewController, public navParams: NavParams, public api: ApiProvider,
    public toastCtrl: ToastController
  ){
    this.window = navParams.get('window')
  }

  public presentToast(msg) {
    var toast = this.toastCtrl.create({
      message: msg,
      position: 'bottom',
      duration: 3000
    })
    toast.present()
  }

  public activateWindow() {
    this.api.activateWindow(this.url, this.window).subscribe((res: any) => {
      this.viewCtrl.dismiss()
    })
  }

  public closeWindow() {
    this.api.closeWindow(this.url, this.window).subscribe((res: any) => {
      if (res.success == true) {
        this.presentToast('Window closed successfully')
        this.viewCtrl.dismiss()
      }
      else {
        this.presentToast('Unable to close window')
        this.viewCtrl.dismiss()
      }
    })
  }

}

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
    public actionSheetCtrl: ActionSheetController, public popoverCtrl: PopoverController,
    public toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.doRefresh(0)
  }

  ionViewDidEnter() {
    this.doRefresh(0)
  }

  toFixed(inf: number): number {
    return parseFloat(inf.toFixed(2))
  }

  presentToast(msg) {
    var toast = this.toastCtrl.create({
      message: msg,
      position: 'bottom',
      duration: 3000
    })
    toast.present()
  }

  getActiveWindows() {
    this.api.getInfo('window').subscribe(res => {
      this.windows = res

      var actionSheet = this.actionSheetCtrl.create({})
      actionSheet.setTitle('Active Windows [' + this.windows.length + ']')
      this.windows.forEach(win => {
        actionSheet.addButton({
          icon: 'albums',
          text: win.trim(),
          handler: () => {
            var popover = this.popoverCtrl.create(WinPopOver, {window: win.trim()})
            popover.present()
          }
        })
      });
      actionSheet.present()
    })
  }

  presentKeyPad() {
    var keypad = this.popoverCtrl.create(KeypadPage)
    keypad.present()
  }

  doShutdown() {
    this.api.performAction('shutdown').subscribe(res => {
      this.presentToast(res.message)
    }, err => {
      console.error(err)
    })
  }

  doLockDown() {
    this.api.performAction('lock').subscribe(res => {
      this.presentToast(res.message)
    }, err => {
      console.error(err)
    })
  }


  doRefresh(refresher: any) {
    this.api.home().subscribe(res => {
      this.info = res

      if (refresher) {
        refresher.complete()
      }
    }, err => {
      console.error(JSON.stringify(err))
    })
  }

}
