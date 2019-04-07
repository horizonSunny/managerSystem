import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule} from 'ng-zorro-antd';
import { BaceheaderComponent } from './baceheader.component';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [BaceheaderComponent]
})
export class BaceheaderModule { }
