import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicComponent } from './dynamic.component';

@NgModule({
  declarations: [
    DynamicComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DynamicComponent
  ],
  // // entryComponents shouldn't have to be a thing with Ivy enabled
  // entryComponents: [
  //   DynamicComponent
  // ]
})
export class DynamicModule { }
