import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { log } from 'util';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {
  // 新建测评方案
  isVisible = false;
  // 操作
  selectedValue = '请选择';
  // 角色名称
  rolenames: any;
  // 角色描述
  roleCon: any;
  // 档案
  archives: any = [];
  // 功能
  listarch: any = [];
  // 模态框数据整合--数组
  dataUsers: any = {};
  // 分页--数据总数
  _total: any;
  // 分页--当前页数
  _current = 1;
  // 分页--每页条数
  pageSize = 10;
  arr: any;
  archivesValue: any;
  powerLists: any = [];
  // 查询列表
  searchsList: any = [];
  demoUser: any;
  numUserTab: any = [];
  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }
  // 组建
  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.checkAll(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfDisplayData.forEach((data, index) => (this.mapOfCheckedId[data.id] = index % 2 !== 0));
        this.refreshStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfDisplayData.forEach((data, index) => (this.mapOfCheckedId[data.id] = index % 2 === 0));
        this.refreshStatus();
      }
    }
  ];
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: any[] = [];
  listOfAllData: any[] = [];
  mapOfCheckedId: { [key: string]: boolean } = {};

  currentPageDataChange($event: Array<{ id: number; name: string; age: number; address: string }>): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.listOfDisplayData.some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData.forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }


  // 角色管理
  roleManage() {
    console.log('1111');
    this.router.navigate(['/system']);

  }

  // 部门管理
  department() {
    console.log('1111');
    this.router.navigate(['/department']);
  }
  // 获取用户权限信息
  showModal(): void {
    this.isVisible = true;
    // 获取权限信息
    this.http.get('http://138.197.212.45:8081/brainPlatform/rest/backend/permission', { headers: { token: localStorage.getItem('token') } }).subscribe((data: any) => {
      const powerUser = data.body;
      console.log(powerUser, 'model用户权限获取');
      this.powerLists = powerUser;
    });
  }
  // 新建角色-模态框-确认
  handleOk(type): void {
    console.log('确定');
    this.isVisible = false;
    const listsUser = this.listarch;
    console.log(listsUser, 'qqquuq');
    this.dataUsers = {
      'roleName': this.rolenames,
      'description': this.roleCon,
      'permissions': {
        [listsUser]: this.archives,
      },
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    };
    // 新增角色信息
    this.http.post('http://138.197.212.45:8081/brainPlatform/rest/backend/role/insert', this.dataUsers, httpOptions).subscribe((data: any) => {
      const listOfData = data.body;
      console.log(listOfData, '11111')
      this.searchsList.unshift(listOfData);
    });
  }
  // 新建数据-模态框-取消
  handleCancel(): void {
    console.log('取消');
    this.isVisible = false;
  }

  // 禁用
  prohibit(id: string): void {
    console.log(id, 'dhfhd');
    this.http.get('http://138.197.212.45:8081/brainPlatform/rest/backend/role/disable' + '?' + 'uid=' + id, { headers: { token: localStorage.getItem('token') } }).subscribe((data: any) => {
      console.log(data, '禁用');
    });
  }
  // 功能选中
  functionClick(archivesValue: string[], index) {
    this.listarch = archivesValue;
    console.log(this.listarch, 'functionClick')
  }
  // model--分配权限档案
  archivesClick(archivesValue: string[]): void {
    this.archives = archivesValue;
    console.log(this.archives, '权限');
  }

  ngOnInit(): void {
    // 档案
    const archives = [];
    // 功能
    const listarch = [];
    // 查询角色权限
    this.http.get('http://138.197.212.45:8081/brainPlatform/rest/backend/role/query' + '?' + 'pageNumber=' + this._current + '&' + 'pageSize=' + this.pageSize, { headers: { token: localStorage.getItem('token') } }).subscribe((data: any) => {
      const searchUsers = data.body;
      this.searchsList = searchUsers.roles;
      console.log(this.searchsList, '查询角色信息');
    });
  }
}