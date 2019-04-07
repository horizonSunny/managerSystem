import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { CookieService } from 'ngx-cookie';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-forgotopwd',
  templateUrl: './forgotopwd.component.html',
  styleUrls: ['./forgotopwd.component.scss']
})
export class ForgotopwdComponent implements OnInit {
  loginForm: FormGroup;
  // 用户--邮箱
  userHide:boolean=true;
  // 邮箱验证码
  emileHide:boolean=false;
  // 密码确认
  passHide:boolean=false;

  login: any = {
    userName: '',
    userEmile:'',
    userPas:'',
    userpasEr:''
  };

  constructor(private fb: FormBuilder,
    private router: Router) { }
  // 邮箱提交
  submitForm(): void {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
  }
  // 邮箱验证码提交
  emileForm():void{
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
  }
  // 密码确认
  passForm():void{
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
  }

  // 邮箱保存
  nextClick(){
    this.userHide=false;
    this.emileHide = true;
  }
  // 邮箱验证码
  emileHideClick(){
    this.emileHide = false;
    this.passHide = true;
  }


  // 取消
  cancelClick(){
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [null, [Validators.required]],
      userEmile: [null, [Validators.required]],
      userPas:[null, [Validators.required]],
      userpasEr:[null, [Validators.required]]
    });
  }

}
