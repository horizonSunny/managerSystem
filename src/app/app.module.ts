import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgZorroAntdModule, NZ_I18N, zh_CN } from "ng-zorro-antd";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { registerLocaleData } from "@angular/common";
import zh from "@angular/common/locales/zh";

import { HomePageModule } from "./homePage/homePage.module";
import { FileslistModule } from "./fileslist/fileslist.module";
import { BaceheaderComponent } from "./common/components/baceheader/baceheader.component";
import { BaceheaderModule } from "./common/components/baceheader/baceheader.module";
import { PresentationComponent } from "./presentation/presentation.component";
import { EvaluationComponent } from "./evaluation/evaluation.component";
import { PromanageComponent } from "./promanage/promanage.component";
import { BacksheaderComponent } from "./backsheader/backsheader.component";
import { FileslistComponent } from "./fileslist/fileslist.component";
import { BackusersComponent } from "./backusers/backusers.component";
import { SystemComponent } from "./system/system.component";
import { DepartmentComponent } from "./department/department.component";
import { AdminusersComponent } from "./adminusers/adminusers.component";
import { CookieService, CookieModule } from "ngx-cookie";
import { ForgotopwdComponent } from "./forgotopwd/forgotopwd.component";
import { JwtModule } from "@auth0/angular-jwt";

import { HttpService } from "./tools/http/httpService";

registerLocaleData(zh);

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    PresentationComponent,
    EvaluationComponent,
    PromanageComponent,
    BacksheaderComponent,
    FileslistComponent,
    BackusersComponent,
    SystemComponent,
    DepartmentComponent,
    AdminusersComponent,
    ForgotopwdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule.forRoot(),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HomePageModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    BaceheaderModule,
    CookieModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [
          "localhost:4200",
          "df_test.jindengtai.cn",
          "test.dfxs.i-tcm.cn",
          "dfxs.i-tcm.cn"
        ],
        blacklistedRoutes: [],
        throwNoTokenError: false
      }
    })
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    CookieService,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
