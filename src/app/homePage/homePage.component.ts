import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CookieService } from "ngx-cookie";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-homePage",
  templateUrl: "./homePage.component.html",
  styleUrls: ["./homePage.component.scss"]
})
export class HomePageComponent implements OnInit {
  loginForm: FormGroup;

  login: any = {
    userName: "",
    password: ""
  };
  tokenRequest: any = {};

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _cookie: CookieService,
    private http: HttpClient
  ) {}

  // 获取cookie
  getCookie() {
    return this._cookie.getObject("mobile");
  }

  // 删除cookie
  deleteCookie() {
    this._cookie.remove("mobile");
  }

  // 记住密码cookie
  setCookie() {
    let today = new Date();
    let target = new Date(today.setDate(today.getDate() + 15));
    this._cookie.putObject("mobile", this.login, { expires: target });
  }

  // 用户名失去焦点
  onBlurUser(num) {
    // console.log(num, '用户失去焦点');
    if (num) {
      const users = {
        usersNumber: num
      };
      // console.log(users, '获取用户信息');
    }
  }
  // 输入密码
  onBlurPass(pass) {
    // console.log(pass, '用户密码');
    if (pass) {
      const passParams = {
        pasOne: pass
      };
      // console.log(passParams, '密码');
    }
  }

  submitForm(): void {
    // this.router.navigate(['/fileslist']);
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
    // console.log(this.login, '222');
    if (this.login.password && this.login.userName) {
      this.tokenRequest.password = this.login.password;
      this.tokenRequest.userName = this.login.userName;
      this.tokenRequest.userType = 0;
      // console.log(this.tokenRequest, '登录数据')
      this.http
        .post(
          "http://138.197.212.45:8081/brainPlatform/rest/user/login",
          this.tokenRequest,
          { observe: "response", responseType: "json" }
        )
        .subscribe(
          (data: any) => {
            // console.log(data.headers.get('Token'), '登陆返回数据');
            const token = data.headers.get("Token");
            localStorage.setItem(
              "token",
              "Bearer pGSGvf3to8eOb48ENhMenzSMMjuwcOHKr59+6id8oQRVVzYCwbaKNg7y7/1dxGTwTN0IPYd5bUCj0oJP7pLFIOuQKYh05vahiF/YIe0SA6Q="
            );
            // console.log(data,'6666');

            if (data.body.status === "1") {
              this.router.navigate(["/fileslist"]);
            }
          },
          err => {
            // console.log('guolai')
          }
        );
    }
  }
  // 忘记密码
  forgetPwd(usersNumber) {
    // console.log(usersNumber, '222');
    sessionStorage.setItem("忘记密码携带用户名", usersNumber);
    this.router.navigate(["/forgotopwd"]);
  }

  ngOnInit(): void {
    this.login = this.getCookie() || {};
    this.tokenRequest.password = "";
    this.tokenRequest.userName = "";
    this.loginForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      userType: 0
    });
  }
}
