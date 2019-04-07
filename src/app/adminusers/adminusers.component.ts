import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
@Component({
  selector: 'app-adminusers',
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.scss']
})
export class AdminusersComponent implements OnInit {
  // 个人资料
  validateForm: FormGroup;
  // 修改密码
  passwordForm:FormGroup;
  // 个人资料
  dataHide:boolean=true;
  // 个人密码
  passHide:boolean=false;
  constructor(private fb: FormBuilder) { }
  // 个人资料提交
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
  // 修改密码提交
  passSubmit(): void {
    for (const i in this.passwordForm.controls) {
      this.passwordForm.controls[i].markAsDirty();
      this.passwordForm.controls[i].updateValueAndValidity();
    }
  }

  // 个人资料
  dataClick(){
    console.log('个人资料');
    this.dataHide = true;
    this.passHide = false;
  }
  // 修改密码
  passClick(){
    console.log('修改密码');
    this.dataHide = false;
    this.passHide = true;
  }
  ngOnInit(): void {
    // 个人资料
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      phone:[null, [Validators.required]],
      emile:[null, [Validators.required]],
      department:[null, [Validators.required]]
    });
    // 修改密码
    this.passwordForm = this.fb.group({
      usedPas:[null, [Validators.required]],
      newPas:[null, [Validators.required]],
      erPas:[null, [Validators.required]]
    })
  }
}
