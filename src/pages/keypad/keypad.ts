import { Component } from '@angular/core';
import { IonicPage, ViewController, ToastController  } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-keypad',
  templateUrl: 'keypad.html',
})
export class KeypadPage {

  keyForm: FormGroup

  constructor(public viewCtrl: ViewController, public api: ApiProvider,
    public formBuilder: FormBuilder, public toastCtrl: ToastController
    ){
      this.keyForm = this.formBuilder.group({
        key: ['', Validators.required]
      })
/** 
      this.keyForm.get('key').valueChanges.subscribe(key => {
        this.sendKey()
      })
*/
    }

    pressEnter(){
      this.sendKey('Return')
    }

    onKeyPress(event) {
      console.log(JSON.stringify(event.which))
    }

    sendKey(key?) {
      if (!key) {
        var key = this.keyForm.get('key').value
      }
      console.log(key)
      this.api.keyPress(key).subscribe(res => {
        if (!res.success) {
          this.presentToast('Error performing command')
        }

      }, err => {
        this.presentToast('Error sending key')
      })
    }

    presentToast(msg) {
      var toast = this.toastCtrl.create({
        message: msg,
        position: 'bottom',
        duration: 3000
      })
      toast.present()
    }
}
