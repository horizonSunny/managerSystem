import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
// import { HttpService } from "../tools/http/httpService";
import { HttpClient } from "@angular/common/http";
//导出Excel
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

@Component({
  selector: "app-fileslist",
  templateUrl: "./fileslist.component.html",
  styleUrls: ["./fileslist.component.scss"]
})
export class FileslistComponent implements OnInit {
  // select的选项信息
  sexSelected: any;
  ageSelected: any;
  educationSelected: any;
  medicalHistorySelected: any;
  medicationNameSelected: any;
  patientNameSelected: any;
  selectInfo = [
    {
      placeHolder: "性别",
      model: this.sexSelected,
      options: [
        { label: "全部", value: "-1" },
        { label: "男", value: "0" },
        { label: "女", value: "1" }
      ]
    },
    {
      placeHolder: "年龄",
      model: this.ageSelected,
      options: [
        { label: "全部", value: "-1" },
        { label: "男", value: "0" },
        { label: "女", value: "1" }
      ]
    },
    {
      placeHolder: "受教育年限",
      model: this.educationSelected,
      options: [
        { label: "全部", value: "-1" },
        { label: "男", value: "0" },
        { label: "女", value: "1" }
      ]
    },
    {
      placeHolder: "病史",
      model: this.medicalHistorySelected,
      options: [
        { label: "全部", value: "-1" },
        { label: "男", value: "0" },
        { label: "女", value: "1" }
      ]
    },
    {
      placeHolder: "药物",
      model: this.medicationNameSelected,
      options: [
        { label: "全部", value: "-1" },
        { label: "男", value: "0" },
        { label: "女", value: "1" }
      ]
    }
  ];
  //list Data
  listOfDisplayData = [];
  // 导出
  isVisible = false;

  constructor(private router: Router, private http: HttpClient) {}
  // 用户基本信息点击
  goToDetails(info) {
    console.log("---------");

    console.log("user_detail_", info);
    const detailInfo = JSON.stringify(info);
    this.router.navigate(["/presentation"], {
      queryParams: { patientInfo: detailInfo },
      skipLocationChange: true
    });

    // this.router.navigate(["/presentation"], {
    //   queryParams: { patientInfo: info }
    // });
  }
  // 导出--model
  showModal(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    console.log("Button ok clicked!");
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log("Button cancel clicked!");
    this.isVisible = false;
  }
  // 导出excel 文件

  exportList() {
    let nameList;
    const params = {
      patientIds: [6]
    };
    this.http
      .post(
        "http://138.197.212.45:8081/brainPlatform/rest/backend/exportPatients",
        params,
        {
          headers: { token: localStorage.getItem("token") }
        }
      )
      .subscribe((res: any) => {
        // this.listOfDisplayData = res.body;
        nameList = res;
        console.log("this.listOfDisplayData_", this.listOfDisplayData);
      });

    let json = nameList;
    //这个nameList (随便起的名字)，是要导出的json数据
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"]
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });
    //这里类型如果不正确，下载出来的可能是类似xml文件的东西或者是类似二进制的东西等
    this.saveAsExcelFile(excelBuffer, "nameList");
  }

  private saveAsExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
    });
    FileSaver.saveAs(data, fileName + "_" + new Date().getTime() + ".xls");
    // 如果写成.xlsx,可能不能打开下载的文件，这可能与Excel版本有关
  }

  ngOnInit(): void {
    const params = {
      educationTime: "",
      medicalHistory: -1,
      medicationName: "",
      orderBy: "",
      pageNumber: 0,
      pageSize: 10,
      patientAge: "",
      patientName: "",
      patientSex: -1,
      sortKey: ""
    };

    this.http
      .post(
        "http://138.197.212.45:8081/brainPlatform/rest/backend/patients",
        params,
        {
          headers: { token: localStorage.getItem("token") }
        }
      )
      .subscribe((res: any) => {
        this.listOfDisplayData = res.body;
        console.log("this.listOfDisplayData_", this.listOfDisplayData);
      });
  }
}
