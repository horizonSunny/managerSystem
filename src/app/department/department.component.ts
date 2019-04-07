import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NzTreeNode, NzTreeNodeOptions, NzFormatEmitEvent, NzTreeComponent } from 'ng-zorro-antd';
import { A11yModule } from '@angular/cdk/a11y';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  @ViewChild('nzTreeComponent') nzTreeComponent: NzTreeComponent;

  // 添加用户
  isAddVisible = false;
  // 新建用户
  isNewVisible = false;
  // 树形--title
  orgName: any;
  // 树形--数据
  shuList: any;
  // 模态框上级部门--数据
  nzOptions: any[] | null = null;
  values: any[] | null = null;
  // 右侧树形结构
  searchUsers: any;
  // 右侧树形结构数据
  nodes: any;
  // model-城市
  options: any;

  uidnumber: any;

  // 医院
  hospitalName: any;
  // 部门名称
  departName: any;
  // 上级名称
  superior: any;

  hostiles: any;

  hosName: any;
  // 医院id
  hosId: any;
  // 医院uid
  hosUid: any;
  // 新增用户
  valueName: any;
  valuePhone: any;
  valueEmile: any;
  // 分页--当前页数
  _current = 0;
  // 分页--每页条数
  pageSize = 10;
  // model-新建用户
  newUser:any = [];
  // 查询角色
  searchsList:any;
  // 角色
  userUid:any;
  roleUid:any;
  rolesNew:any = [];
  // 树形部门
  nodeswww:any;
  shuNumber:any;
  treeKeys:any;
  selectedValue = this.treeKeys;
  newUserRole:any;
  newUserLIst:any;
  newUserdepart:any;
  // 部门
  userOrganzation:any;


  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }


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
        this.listOfDisplayData.forEach((data, index) => this.mapOfCheckedId[data.id] = index % 2 !== 0);
        this.refreshStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfDisplayData.forEach((data, index) => this.mapOfCheckedId[data.id] = index % 2 === 0);
        this.refreshStatus();
      }
    }
  ];
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData = [];
  listOfAllData = [];
  mapOfCheckedId = {};

  currentPageDataChange($event: Array<{ id: number, name: string; age: number; address: string }>): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate = this.listOfDisplayData.some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData.forEach(item => this.mapOfCheckedId[item.id] = value);
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
  // 编辑部门
  editModal() {
    console.log('编辑部门');

  }
  // 添加部门
  addModal() {
    console.log('111');
    this.isAddVisible = true;
  }
  // 新建用户
  newModal(): void {
    this.isNewVisible = true;
    // 查询角色权限
    this.http.get('http://138.197.212.45:8081/brainPlatform/rest/backend/role/query'+'?'+'pageNumber='+this._current+'&'+'pageSize=' +this.pageSize, { headers: { token: localStorage.getItem('token') } }).subscribe((data: any) => {
      const searchUsers = data.body.roles;
      console.log(searchUsers,'查询角色');
      this.searchsList = searchUsers;
      // console.log(this.searchsList,'查询角色信息');
      let roleUid = [];
      let userUid = this.searchsList.map((userUids)=>{
        // console.log(userUids.uid,'角色管理')
        roleUid.push(userUids.uid);
      })
      console.log(roleUid,'角色管理')
    });
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isNewVisible = false;
    this.isAddVisible = false;
    // console.log(this.hospitalName,'医院Id')
    // 医院id
    let hosId;
    // 医院uid
    let hosUid = []
    let hostiles = this.hospitalName.map((hostileValue) => {
      // hosId.push(hostileValue.cityId);
      hosId = hostileValue.cityId;
      console.log(hosId, 'yyyyy')
      hosUid.push(hostileValue.uid);
    });
    console.log(hosUid, 'uid')

    // 新增医院数据
    const createOrganization = {
      "hospitals": hosUid,
      "orgName": this.departName,
      "parentOrgId": '',
    }
    console.log(createOrganization, 'yiyiy')
    this.http.post('http://138.197.212.45:8081/brainPlatform/rest/backend/org/insert', createOrganization, { headers: { token: localStorage.getItem('token') } }).subscribe((data: any) => {
      console.log(data, '医院')
    });
  }
  // 新建用户
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isNewVisible = false;
    this.isAddVisible = false;
  }
  //新建用户
  handleUserOk(): void {
    console.log('111')
    this.isNewVisible = false;
    this.isAddVisible = false;
    // 新增用户数据
    const createUser = {
      "email": this.valueEmile,
      "fullname": this.valueName,
      "mobilenumber": this.valuePhone,
      "orgId": this.treeKeys,
      "roleIds":this.rolesNew,
    }
    console.log(createUser,'新增用户');
    this.http.post('http://138.197.212.45:8081/brainPlatform/rest/backend/user/insert', createUser, { headers: { token: localStorage.getItem('token') } }).subscribe((data: any) => {
      this.newUserRole = data.body; 
      console.log(this.newUserRole, '医院')
      this.newUserLIst.push(this.newUserRole);
    });
  }

  // 模态框--医院
  onChanges(value): void {
    console.log(value, this.values, '医院名称');
    let hostile = this.nzOptions;
    console.log(hostile, '城市');
    const uidList = value[1];
    console.log(uidList, '最后')
    this.http.get('http://138.197.212.45:8081/brainPlatform/rest/backend/city/hospital/query' + '?' + 'uid=' + uidList, { headers: { token: localStorage.getItem('token') } }).subscribe((data: any) => {
      // console.log(data.body, '医院')
      this.hospitalName = data.body;
      console.log(this.hospitalName, '医院')
    });
  }
  // 模态框--医院删除
  removeClick() {
    console.log('删除医院')
  }



  // 左侧树形结构-----点击任意节点触发
  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event, '树形结构')
    this.treeKeys = event.keys[0];
    console.log(this.treeKeys,'shuxing')
  } 
  
  // 添加部门模态框角色---
  addModelRole(value: string[]): void {
    console.log(value, '添加部门');
  }
  // 新增用户角色
  newModelRole(value: string[]): void {
    const newRole = value;
    this.rolesNew = newRole;
    console.log(this.rolesNew, '新增用户角色');
  }

  // 左侧树形结构数据获取
  getTree(): void {
    this.http.get('http://138.197.212.45:8081/brainPlatform/rest/backend/org/query', { headers: { token: localStorage.getItem('token') } }).subscribe((data: any) => {
      const searchUsers = data.body;
      this.shuList = searchUsers;
      console.log(this.shuList, '11111')
      this.nodes = data.body;
      let shuKey = []
      let shuNumber = this.shuList.map((hostileValue) => {
        console.log(hostileValue.key,'树形数据');
        shuKey.push(hostileValue.key);
      });
      console.log(shuKey, 'uid')
      });
  }

  // 禁用
  disable(id):void{
    console.log(id,'1111');
    this.http.get('http://138.197.212.45:8081/brainPlatform/rest/backend/user/disable'+'?'+'uid='+id, { headers: { token: localStorage.getItem('token') } }).subscribe((data: any) => {
      console.log(data,'禁用');
    });
  }


  ngOnInit(): void {
    this.getTree();
    // 获取城市
    this.http.get('http://138.197.212.45:8081/brainPlatform/rest/backend/city/query', { headers: { token: localStorage.getItem('token') } }).subscribe((data: any) => {
      this.options = data.body;
      // console.log(this.options, '城市');
      setTimeout(() => {
        this.nzOptions = this.options;
      }, 100);
    });
    // 获取用户列表
    this.http.get('http://138.197.212.45:8081/brainPlatform/rest/backend/user/query' + '?' + 'pageNumber=' + this._current + '&' + 'pageSize=' + this.pageSize, { headers: { token: localStorage.getItem('token') } }).subscribe((data: any) => {
      // console.log(data.body, '用户列表')
      const newUser = data.body.users;
      // console.log(newUser,'yonhu')
  
      this.userOrganzation = newUser;
      for(let index = 0 ;index<newUser.length;index++){
        let role = newUser[index].userRoles
        let roleName = '';
        if(role.length!==0){
          role.map((item,index)=>{
            console.log('item_',item.roleName)
            roleName+=item['roleName']
            console.log('roleName_',roleName)
            })
          }
          newUser[index].userRoles = roleName
        }
       this.newUserLIst = newUser;
      console.log(this.newUserLIst,'yonhu');
    });
  }
}
