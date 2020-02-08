import { MorePage } from '../../pages/more/more';
import { Injectable } from '@angular/core';
import { Platform, ModalController} from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

@Injectable()
export class CommonLogicProvider {

  constructor(
    private platform: Platform,
    private modalCtrl: ModalController,
    private admob: AdMobFree,
    ) {
    console.log('Hello CommonLogicProvider Provider');
  }

  //admobバナー広告の表示
  showAddmobBanner(admobid: string){
     
    if (this.platform.is('cordova')) {
      const bannerConfig: AdMobFreeBannerConfig = {
       id: admobid,
       isTesting: false,
       overlap:false,
       autoShow: true,  
      };
      this.admob.banner.config(bannerConfig);
      this.admob.banner.prepare()
       .then(() => {
         // banner Ad is ready
         // if we set autoShow to false, then we will need to call the show method here
       })
       .catch(e => console.log(e));
     }
    }

  //admobインタースティシャル広告の表示
  showAddmobInterstitial(admobid: string){
     
    if (this.platform.is('cordova')) {
      const interstisialConfig: AdMobFreeInterstitialConfig = {
       id: admobid,
       isTesting: false,
       autoShow: true,  
      };
      this.admob.interstitial.config(interstisialConfig);
      this.admob.interstitial.prepare()
       .then(() => {
         // banner Ad is ready
         // if we set autoShow to false, then we will need to call the show method here
       })
       .catch(e => console.log(e));
     }
    }


  /**
   * モーダル（moreページ）の表示
   */
  showMoreModal() {
    const modal = this.modalCtrl.create(MorePage);
    modal.present();
  }
}
