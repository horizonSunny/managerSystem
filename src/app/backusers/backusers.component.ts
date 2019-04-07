import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-backusers',
  templateUrl: './backusers.component.html',
  styleUrls: ['./backusers.component.scss']
})
export class BackusersComponent implements OnInit {
  // 导出
  isVisible = false;
  // 新建
  newVisible = false;
  searchValue = '';
  // 脑健师
  healthyDivision:any;
  selectedValue = '请选择';
  // 脑健师
  hosNumber:any;
  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }
// 组建
sortName: string | null = null;
sortValue: string | null = null;
// 状态
listOfFilterAddress = [{ text: '正常', value: '正常' }, { text: '禁用', value: '禁用' }];
// 性别
listOfFilterSex = [{ text: '2', value: '2' }, { text: '0', value: '0' }];
// 教育程度
listOfFilterEducation = [{ text: '乌鲁木齐阿波罗医院', value: '乌鲁木齐阿波罗医院' }, { text: '仁济医院', value: '仁济医院' }, { text: '浦东妇幼', value: '浦东妇幼' }];
listOfSearchAddress: string[] = [];
listOfSearchSex: string[] = [];
listOfSearchEducation: string[] = [];
listOfSearchMedicine: string[] = [];
listOfData: Array<{ userName: string; age: number; address: string; sex: string; mobilenumber: string; registerEmail: string; hospitals: string;doctorNumber:string; status: string; createTime: string; fullname: string;[key: string]: string | number }> = [this.hosNumber];
listOfDisplayData = [...this.listOfData];
reset(): void {
  this.searchValue = '';
  this.search();
}
// 排序事件
sort(sort: { key: string; value: string }): void {
  this.sortName = sort.key;
  this.sortValue = sort.value;
  this.search();
}
// 详情地址
filterAddressChange(value: string[]): void {
  this.listOfSearchAddress = value;
  console.log(this.listOfSearchAddress, 'sddfdf');

  this.search();
}
// 性别
filterSexChange(value: string[]): void {
  this.listOfSearchSex = value;
  console.log(this.listOfSearchSex, '2222');

  this.search();
}
// 教育程度
filterEducationChange(value: string[]): void {
  this.listOfSearchEducation = value;
  console.log(this.listOfSearchEducation, '2222');

  this.search();
}

search(): void {
  const filterFunc = (item: { userName: string; age: number; address: string, sex: string; mobilenumber: string; registerEmail: string; hospitals: string;doctorNumber:string; status: string; createTime: string; fullname: string;}) => {
    return (
      (this.listOfSearchAddress.length
        ? this.listOfSearchAddress.some(address => item.address.indexOf(address) !== -1)
        : true) && item.userName.indexOf(this.searchValue) !== -1 &&
      (this.listOfSearchSex.length
        ? this.listOfSearchSex.some(sex => item.sex.indexOf(sex) !== -1)
        : true) && item.userName.indexOf(this.searchValue) !== -1 &&
      (this.listOfSearchEducation.length
        ? this.listOfSearchEducation.some(hospitals => item.hospitals.indexOf(hospitals) !== -1)
        : true) && item.userName.indexOf(this.searchValue) !== -1
      // (this.listOfSearchMedicine.length
      //   ? this.listOfSearchMedicine.some(medicine => item.medicine.indexOf(medicine) !== -1)
      //   : true) && item.name.indexOf(this.searchValue) !== -1
    );
  };
  const data = this.listOfData.filter((item: { userName: string; age: number; address: string, sex: string, mobilenumber: string, registerEmail: string; hospitals: string;doctorNumber:string; status: string; medicine: string; createTime: string; fullname: string;}) => filterFunc(item));
  this.listOfDisplayData = data.sort((a, b) =>
    this.sortValue === 'ascend'
      ? a[this.sortName!] > b[this.sortName!]
        ? 1
        : -1
      : b[this.sortName!] > a[this.sortName!]
        ? 1
        : -1
  );
}

// 测评列表
healthyUser() {
  console.log('1111');
  this.router.navigate(['/backusers']);

}
// 下载模板
downloadModal() {
  console.log('下载模板');
}
// 导入
importModal() {
  console.log('导入');
}
// 导出
exportModal() {
  console.log('导出');
  this.isVisible = true;

}
// 新建
showModal(): void {
  this.newVisible = true;
}

handleOk(): void {
  console.log('Button ok clicked!');
  this.isVisible = false;
  this.newVisible = false;
}

handleCancel(): void {
  console.log('Button cancel clicked!');
  this.isVisible = false;
  this.newVisible = false;
}


ngOnInit(): void {
  const condition = {
    'doctorSex': '',
    'doctorStatus': '',
    'fullname': '',
    'hospitalId': '',
    'orderBy': '',
    "pageNumber": 0,
    "pageSize": 10,
    "sortKeyWord": ''
  }
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'token': localStorage.getItem('token')
    })
  };
  console.log(httpOptions,'1111')
  this.http.post('http://138.197.212.45:8081/brainPlatform/rest/backend/queryDoctors', condition, httpOptions).subscribe((data: any) => {
    const healthyList = data.body;
    this.healthyDivision = healthyList;
    console.log(this.healthyDivision, '脑健师');
      let hosValue = [];
      let healthyListSssss = this.healthyDivision.map((healthyValue) =>{
        console.log(healthyValue.doctorEntity,'树形数据');
        hosValue.push(healthyValue.doctorEntity);
      });
      this.hosNumber = hosValue;
      console.log(hosValue, '脑健师');
  });
}
}
