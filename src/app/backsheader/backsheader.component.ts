import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-backsheader',
  templateUrl: './backsheader.component.html',
  styleUrls: ['./backsheader.component.scss']
})
export class BacksheaderComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  // 档案点击
  archives(){
    console.log('档案点击');
    this.router.navigate(['/fileslist']);
  }
  // 测评点击
  evaluation(){
    console.log('测评点击');
    this.router.navigate(['/evaluation']);
  }
  // 用户点击
  usersClick(){
    console.log('用户点击');
    this.router.navigate(['/backusers']);
  }
  // 系统点击
  operate(){
    console.log('运营点击');
    this.router.navigate(['/system']);
  }

  // 管理员点击
  adminUser(){
    this.router.navigate(['/adminusers']);
  }

  ngOnInit() {
  }

}
