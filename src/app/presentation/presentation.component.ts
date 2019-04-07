import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-presentation",
  templateUrl: "./presentation.component.html",
  styleUrls: ["./presentation.component.scss"]
})
export class PresentationComponent implements OnInit {
  detailsInfo: any;

  hideDetile: boolean = true;
  hideevaluation: boolean = false;

  // 顶部时间横轴设置
  tabs: any[] = [];
  nzTabPosition = "top";
  selectedIndex = 0;
  test = "是";
  // 查看详情模态框
  isVisible = false;

  constructor(private routeInfo: ActivatedRoute) {}

  // 基本信息点击
  basicData() {
    console.log("1111");
    this.hideDetile = true;
    this.hideevaluation = false;
  }
  // 测评报告点击
  presentText() {
    console.log("1111");
    this.hideevaluation = true;
    this.hideDetile = false;
  }

  log(args: any[]): void {
    console.log(args);
  }

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

  ngOnInit(): void {
    // this.detailsInfo = this.routeInfo.snapshot.queryParams["id"];
    // console.log("this.detailsInfo_", this.detailsInfo);
    this.detailsInfo = JSON.parse(
      this.routeInfo.snapshot.queryParams["patientInfo"]
    );
    console.log("detailsInfo_", this.detailsInfo);

    for (let i = 0; i < 20; i++) {
      this.tabs.push({
        name: ` 02/25 12:2${i}`,
        content: `2019 ${i}`
      });
    }
  }
}
