import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule} from 'ng-zorro-antd';
import { HomePageComponent } from './homePage.component';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [HomePageComponent]
})
export class HomePageModule { }
