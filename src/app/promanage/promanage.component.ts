import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-promanage',
  templateUrl: './promanage.component.html',
  styleUrls: ['./promanage.component.scss']
})
export class PromanageComponent implements OnInit {
  // 新建测评方案
  isVisible = false;
  // 获取测评方案
  planList:any;
  // 分页
  _current=0;
  pageSize=10;
  // 新建分类
  classification:any;
  // 方案名称
  assTitleValue:any;
  // 方案简介
  assessmentValue:any;
  // 所属医院
  // affiliatedHospital:any;
  // 选择测评
  chooseEvaluation:any;
  // 发送新建方案
  newPlan:any;
  // 医院
  values: any[] | null = null;
  // model-城市
  options: any;
  nzOptions: any[] | null = null;
  hospitalName: any;
  // 详细测评列表
  planItem:any; 
  // 医院名称
  hostileName:any;
  // 测评方案名称
  evelaValue:any;
  // 测评量表 
  evalList:any;


  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  listOfSelection = [
    {
      text    : 'Select All Row',
      onSelect: () => {
        this.checkAll(true);
      }
    },
    {
      text    : 'Select Odd Row',
      onSelect: () => {
        this.listOfDisplayData.forEach((data, index) => this.mapOfCheckedId[data.id] = index % 2 !== 0);
        this.refreshStatus();
      }
    },
    {
      text    : 'Select Even Row',
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

  currentPageDataChange($event: Array<{ id: number, name: string; age: number; address: string}>): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => this.mapOfCheckedId[ item.id ]);
    this.isIndeterminate = this.listOfDisplayData.some(item => this.mapOfCheckedId[ item.id ]) && !this.isAllDisplayDataChecked;
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData.forEach(item => this.mapOfCheckedId[ item.id ] = value);
    this.refreshStatus();
  }

  // 测评列表
  basicData(){
    console.log('1111');
    this.router.navigate(['/evaluation']);
    
  }

  // 方案管理
  presentText(){
    console.log('1111');
    this.router.navigate(['/promanage']);
  }
  // 新建方案
  showModal(): void {
    this.isVisible = true;
  }
  // 新建方案---确定
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
    const createAssessmentPlanDto = {
      // 测评方案描述
      'assessmentPlanDescribe':this.assessmentValue,
      // 测评方案名称
      'assessmentPlanName':this.assTitleValue,
      // 新建测评方案类别
      'classify':this.classification,
      // 新建医院唯一标识
      'hospitalUid':this.hostileName,
      // 选择测评项目uid集合
      'items':[this.evelaValue],
    }
    console.log(createAssessmentPlanDto,'新建方案')
    this.http.post('http://138.197.212.45:8081/brainPlatform/rest/backend/assessmentPlan/insert', createAssessmentPlanDto, { headers: { token: localStorage.getItem('token') } }).subscribe((data: any) => {
      console.log(data,'发送新建测评方案');
      this.newPlan = data.body;
      this.planItem.push(this.newPlan);
    });
  }
  // 新建方案--取消
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  // 新建测评方案---分类
  classClick(value):void{
    this.classification = value;
    console.log(this.classification,'分类')
  }

  // 模态框--城市
  onChanges(value:any): void {
    console.log(value, this.values, '城市名称');
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
  // 模态框--医院
  hostileChanges(value:any):void{
    console.log(value, '医院名称');
    this.hostileName = value;
  }

  // 模态框--测评
  eveluaChanges(value:any):void{
    console.log(value, '测评名称');
    this.evelaValue = value;
  }


  ngOnInit(): void {
    this.http.get('http://138.197.212.45:8081/brainPlatform/rest/backend/assessmentPlan/query' + '?' + 'pageNumber=' + this._current + '&' + 'pageSize=' + this.pageSize, { headers: { token: localStorage.getItem('token') } }).subscribe((data: any) => {
      const evaluationList = data.body;
      this.planList = evaluationList;
      console.log(this.planList, '总测评列表');
      this.planItem = evaluationList.assessmentPlans;
      // console.log(this.planItem, '详细测评列表');
    });
    // 获取城市
    this.http.get('http://138.197.212.45:8081/brainPlatform/rest/backend/city/query', { headers: { token: localStorage.getItem('token') } }).subscribe((data: any) => {
      this.options = data.body;
      console.log(this.options, '城市');
      setTimeout(() => {
        this.nzOptions = this.options;
      }, 100);
    });
    this.http.get('http://138.197.212.45:8081/brainPlatform/rest/backend/assessmentItem/find', { headers: { token: localStorage.getItem('token') } }).subscribe((data: any) => {
      // console.log(data.body, '测评列表');
      const evaluationList = data.body;
      this.evalList = data.body;
      // console.log(this.evalList, '测评列表');
    });
  }

}
