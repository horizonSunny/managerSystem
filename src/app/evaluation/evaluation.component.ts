import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {
  // 新建测评方案
  isVisible = false;
  // 分页
  _current = 0;
  pageSize = 10;
  // 初始化测评列表
  evalList:any;
  // 测评量表内容
  assessmentValue:any;
  // 测评量表名称
  assTitleValue:any;
  // 测评量表用时
  assessmentTime:any;
  // 测评量表类别
  categoryValue:any;
  // 分类
  classification:any;
  // 新建测评方案
  planLiat:any;

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
  // 新建测评方案
  showModal(): void {
    this.isVisible = true;
  }
  // 新建测评方案---确定
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
    console.log(this.evalList,'dhsfhdfd')
    const createAssessmentItemDto = {
      'assessmentContent':this.assessmentValue,
      'assessmentName':this.assTitleValue,
      'classify':this.classification,
      'duration':this.assessmentTime
    }
    console.log('11111',createAssessmentItemDto);
    this.http.post('http://138.197.212.45:8081/brainPlatform/rest/backend/assessmentItem/insert', createAssessmentItemDto, { headers: { token: localStorage.getItem('token') } }).subscribe((data: any) => {
      console.log(data,'发送新建测评方案');
      this.planLiat = data.body;
      this.evalList.push(this.planLiat);
    });
  }
  // 新建测评方案---取消
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  // 新建测评方案---分类
  classClick(value):void{
    this.classification = value;
    console.log(this.classification,'分类')
  }


  ngOnInit(): void {
    this.http.get('http://138.197.212.45:8081/brainPlatform/rest/backend/assessmentItem/query' + '?' + 'pageNumber=' + this._current + '&' + 'pageSize=' + this.pageSize, { headers: { token: localStorage.getItem('token') } }).subscribe((data: any) => {
      console.log(data.body, '测评列表');
      const evaluationList = data.body;
      this.evalList = data.body;
    });
  }

}
