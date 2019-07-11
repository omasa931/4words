

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { SelectStagePage } from './../pages/select-stage/select-stage';
import { TopPage } from './../pages/top/top';
import { PlayGame1Page } from './../pages/play-game1/play-game1';
import { PlayGame2Page } from './../pages/play-game2/play-game2';
import { PlayGame3Page } from './../pages/play-game3/play-game3';
import { ResultPage } from './../pages/result/result';
import { MorePage } from './../pages/more/more';
import { PrivacypolicyPage } from './../pages/privacypolicy/privacypolicy';
import { ModeSelectPage } from './../pages/mode-select/mode-select';
import { CommonLogicProvider } from '../providers/common-logic/common-logic';
import { Backdrop2Provider } from   '../providers/backdrop2/backdrop2';
import { SettingProvider } from '../providers/setting/setting';
import { BackdropProvider } from '../providers/backdrop/backdrop';
import { HttpClientModule } from '@angular/common/http';
import { AdMobFree } from '@ionic-native/admob-free';

@NgModule({
  declarations: [
    MyApp,
    TopPage,
    SelectStagePage,
    PlayGame1Page,
    PlayGame2Page,
    PlayGame3Page,
    ResultPage,
    MorePage,
    PrivacypolicyPage,
    ModeSelectPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TopPage,
    SelectStagePage,
    PlayGame1Page,
    PlayGame2Page,
    PlayGame3Page,
    ResultPage,
    MorePage,
    PrivacypolicyPage,
    ModeSelectPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AdMobFree,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CommonLogicProvider,
    SettingProvider,
    BackdropProvider,
    Backdrop2Provider
  ]
})
export class AppModule {}
