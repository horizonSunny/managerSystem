import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromanageComponent } from './promanage.component';

describe('PromanageComponent', () => {
  let component: PromanageComponent;
  let fixture: ComponentFixture<PromanageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromanageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
