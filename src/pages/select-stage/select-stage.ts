import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { PlayGame1Page } from './../play-game1/play-game1';
import { PlayGame2Page } from './../play-game2/play-game2';
import { PlayGame3Page } from './../play-game3/play-game3';
import { ModeSelectPage } from './../mode-select/mode-select';
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
  playmode: String;
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
    //ステージ情報を取得
    this.getStageData()
  }

  //ステージ選択一覧画面への表示内容を取得
  getStageData() {
    //モード1固定
    //ステージの情報を取得
    
    this.getStageJsonData(constant.MODE1).subscribe(
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
    this.commonlogic.showAddmobBanner(constant.ADMOB_BANNER);
  }

  ionViewDidEnter() {
    //モードの読み込み
    this.storage.get('mode').then(
      (val) => {
        if (val == constant.MODE1) {
          this.playmode = "文字当てモード"
        } else if(val == constant.MODE2) {
          this.playmode = "読み方当てモード"
        } else if(val == constant.MODE3) {
          this.playmode = "意味当てモード"
        }
      }
    )
  }

  //各ステージのデータを取得
  getStageJsonData(mode: string) {
    console.log("SelectStagePage.getStageJsonData");
    return this.http.get<stagedata[]>('../../assets/data/stagedate1.json');
  }

  playGame(stage :stagedata) {
    //ステージ番号取得
    let stageNo = stage.no;
    console.log("stage:" + stage.no)
    //モード
    this.storage.get('mode').then(
      (val) => {
        if (val == constant.MODE1) {
          this.navCtrl.push(PlayGame1Page, {currentStage: stageNo });
        } else if(val == constant.MODE2) {
          this.navCtrl.push(PlayGame2Page, {currentStage: stageNo });
        } else if(val == constant.MODE3) {
          this.navCtrl.push(PlayGame3Page, {currentStage: stageNo });
        }
      }
    );
  }

  presentPopover(event) {
    const popover = this.popoverCtrl.create(ModeSelectPage, {},  {cssClass: 'custom-popover'});
    popover.present({
      ev: event
    });
  }

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
