import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectStagePage } from './select-stage';

@NgModule({
  declarations: [
    SelectStagePage,
  ],
  imports: [
    IonicPageModule.forChild(SelectStagePage),
  ],
})
export class SelectStagePageModule {}
