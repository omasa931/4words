import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { PlayGame1Page } from './../play-game1/play-game1';
import { PlayGame2Page } from './../play-game2/play-game2';
//import { PlayGame3Page } from './../play-game3/play-game3';;
import { HttpClient } from '@angular/common/http';
import { CommonLogicProvider } from './../../providers/common-logic/common-logic';
import * as constant from '../../constant';
import { Storage } from '@ionic/storage';
import { stagedata } from './../../app/models/stagedata';

//import { Firebase } from '@ionic-native/firebase/ngx';
//import { Platform} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-select-stage',
  templateUrl: 'select-stage.html',
})
export class SelectStagePage {
  data: Array<string>;
  playmode: string;
  stagedatas: stagedata[]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private commonlogic: CommonLogicProvider,
    private http: HttpClient,
    //private platform: Platform,
    //private firebase: Firebase,
    private storage: Storage) {

    // if (platform.is('cordova')) {
    //   firebase.getToken()
    //     .then(token => this.registerToken(token))
    //     .catch(error => console.error('Error getting token', error));
  
    //     firebase.hasPermission().then( data => {
    //     if(data.isEnabled != true){
    //       firebase.grantPermission().then( data => { //通知を許可する
    //         console.log(data.body);
    //       });
    //     }
    //   });
  
    //   firebase.onNotificationOpen().subscribe( data => {
    //       console.log(data.body);
    //       this.showAlert(data.body);
    //   });
    // }
    //現在のモード
    this.playmode = navParams.data.mode;
    this.getStageData()
  }

  //ステージ選択一覧画面への表示内容を取得
  getStageData() {
    //モード1固定
    //ステージの情報を取得
    //console.log("this.playmode:" + this.playmode)
    this.getStageJsonData(this.playmode).subscribe(
      result => {
        this.stagedatas = result;
        //console.log(this.stagedatas);
        //ステージの件数分ループ
        for (let i = 0 ; i< result.length; i++) {
          //各ステージのクリア実績取得用キー
          let key = this.stagedatas[i].modestage;
          //ステージのクリア実績を取得する
          this.storage.get(key).then(
            (val) => {
              //クリア実績がある場合、最高スコアとタイムを表示
              if (val != null) {
                this.stagedatas[i].highScore 
                  = "正解数 ： " + val.hightScore + "/" + this.stagedatas[i].quastionCnt + "問";

                this.stagedatas[i].clearTime 
                  = "タイム:" + val.clearTime + "秒";
              }
            }
          )
        }
      },
      err =>{
        console.error("Error : "+err);
      } ,
      () => {
      }
    ); 
  }

  ionViewDidLoad() {
    console.log("SelectStagePage.ionViewDidLoad");
    this.commonlogic.showAddmobBanner(constant.ADMOB_BANNER_SELECT);
  }

  //各ステージのデータを取得
  getStageJsonData(p_mode: string) {
    console.log("SelectStagePage.getStageJsonData");
    if (p_mode == constant.MODE1) {
      return this.http.get<stagedata[]>('../../assets/data/stagedate1.json');
    // 今のところelseはmode2 
    } else {
      return this.http.get<stagedata[]>('../../assets/data/stagedate2.json');
    }
  }

  playGame(stage :stagedata) {
    //ステージ番号取得
    let stageNo = stage.no;
    console.log("stage:" + stage.no)
    //モード
    if (this.playmode == constant.MODE1) { 
      this.navCtrl.push(PlayGame1Page, {currentStage: stageNo});
      // 今のところelseはmode2
    } else {
      this.navCtrl.push(PlayGame2Page, {currentStage: stageNo});
    }
  }

  // presentPopover(event) {
  //   const popover = this.popoverCtrl.create(ModeSelectPage, {},  {cssClass: 'custom-popover'});
  //   popover.present({
  //     ev: event
  //   });
  // }

  // private registerToken(token: string) {
  //   //alert(token); //tokenが取得できれば表示
  // }

  // private showAlert(message: string) {
  //   alert(message); //tokenが取得できれば表示
  // }

  /**
   * モーダル（moreページ）の表示
   */
  showMoreModal() {
    console.log('SelectStagePage.showMoreModal()');
    this.commonlogic.showMoreModal()
  }
}
