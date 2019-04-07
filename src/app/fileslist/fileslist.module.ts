import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { FileslistComponent } from "./fileslist.component";
import { HttpService } from "../tools/http/httpService";

@NgModule({
  imports: [CommonModule, NgZorroAntdModule, FormsModule, ReactiveFormsModule],
  declarations: [FileslistComponent],
  providers: [HttpService]
})
export class FileslistModule {}
