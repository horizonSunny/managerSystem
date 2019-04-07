import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotopwdComponent } from './forgotopwd.component';

describe('ForgotopwdComponent', () => {
  let component: ForgotopwdComponent;
  let fixture: ComponentFixture<ForgotopwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotopwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotopwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
