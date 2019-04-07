import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomePageComponent } from "./homePage/homePage.component";
import { FileslistComponent } from "./fileslist/fileslist.component";
import { BaceheaderComponent } from "./common/components/baceheader/baceheader.component";
import { PresentationComponent } from "./presentation/presentation.component";
import { EvaluationComponent } from "./evaluation/evaluation.component";
import { PromanageComponent } from "./promanage/promanage.component";
import { BacksheaderComponent } from "./backsheader/backsheader.component";
import { BackusersComponent } from "./backusers/backusers.component";
import { SystemComponent } from "./system/system.component";
import { DepartmentComponent } from "./department/department.component";
import { AdminusersComponent } from "./adminusers/adminusers.component";
import { ForgotopwdComponent } from "./forgotopwd/forgotopwd.component";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  // 登陆页面
  {
    path: "login",
    component: HomePageComponent
  },
  {
    path: "main",
    loadChildren: "../app/main/main.module#MainModule"
  },
  // 档案列表
  {
    path: "fileslist",
    component: FileslistComponent
  },
  // 档案列表顶部
  {
    path: "baceheader",
    component: BaceheaderComponent
  },
  // 档案详情
  {
    path: "presentation",
    component: PresentationComponent
  },
  // 测评列表
  {
    path: "evaluation",
    component: EvaluationComponent
  },
  // 方案管理
  {
    path: "promanage",
    component: PromanageComponent
  },
  // 后台管理header组建
  {
    path: "backsheader",
    component: BacksheaderComponent
  },
  // 用户
  {
    path: "backusers",
    component: BackusersComponent
  },
  // 系统--角色管理
  {
    path: "system",
    component: SystemComponent
  },
  // 系统--部门管理
  {
    path: "department",
    component: DepartmentComponent
  },
  // admin管理员
  {
    path: "adminusers",
    component: AdminusersComponent
  },
  // 忘记密码
  {
    path: "forgotopwd",
    component: ForgotopwdComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
