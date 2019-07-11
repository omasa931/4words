import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { setting } from "../../app/models/setting";
import 'rxjs/add/operator/map';
@Injectable()
export class SettingProvider {

  modeData : {
    lang: string,
    mode: string
  } = {
    lang: '',
    mode: ''
  };

  //mode
  private mode :string;

  constructor(
    public http: HttpClient,
    private storage: Storage) {

  }

  //モード取得
  public getMode() :string {
    this.storage.get('mode').then(
      (val)=>{
        console.log("val:" + val);
        this.mode = val;
      });
      return this.mode
  }

  public setMode(mode :string) {
    console.log('SettingProvider setMode');
    console.log("mode:" + mode);
    this.storage.set('mode', mode);
  }

  //モード変更

  //setting読込
  getSettingData() {
    return this.http.get<setting>('/assets/setting/setting.json');
  }
}
