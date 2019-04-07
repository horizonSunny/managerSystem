import { Injectable } from "@angular/core";
// import { Http, Headers } from "@angular/http";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import * as global from "./global";

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}
  /**
   * @param {string} url地址
   * @param {any} [options]可选提交的参数
   * @param {any} [header]可选设置的头信息
   * @memberof ServiceBaseService
   * @title: 封装一个get请求的基础类
   */
  getData(url: string, options?: any, myheaders?: any): Observable<any> {
    // 配置请求头
    const myHeaders: HttpHeaders = new HttpHeaders();
    const header = { headers: { token: localStorage.getItem("token") } };
    // myHeaders.append("token", localStorage.getItem("token"));
    // tslint:disable-next-line:forin
    // for (const key in myheaders) {
    //   myHeaders.append(key, myheaders[key]);
    // }
    url += (url.indexOf("?") < 0 ? "?" : "&") + this.param(options);
    const urlAll = global.url + url;
    console.log("urlAll_get_", urlAll);
    return this.http.get(urlAll, {
      headers: { token: localStorage.getItem("token") }
    });
  }

  /**
   * @param url地址
   * @param options提交的数据
   * @param myheaders可选参数设置头
   * @title:封装一个post请求数据的
   */
  postData(url: string, options: any, myheaders?: any): Observable<any> {
    const myHeaders: HttpHeaders = new HttpHeaders();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", localStorage.getItem("token"));
    // tslint:disable-next-line:forin
    for (const key in myheaders) {
      myHeaders.append(key, myheaders[key]);
    }
    const urlAll = global.url + url;
    console.log("urlAll_post_", urlAll);
    return this.http.post(urlAll, options, { headers: myHeaders });
  }
  /**
   * @param {any} data
   * @returns
   * @memberof ServiceBaseService
   * @title:封装一个序列化get请求的参数的方法
   */
  param(data): string {
    let url = "";
    // tslint:disable-next-line:forin
    for (const k in data) {
      const value = data[k] !== undefined ? data[k] : "";
      url += `&${k}=${encodeURIComponent(value)}`;
    }
    return url ? url.substring(1) : "";
  }
}
