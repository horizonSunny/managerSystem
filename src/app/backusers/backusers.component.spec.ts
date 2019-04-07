import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackusersComponent } from './backusers.component';

describe('BackusersComponent', () => {
  let component: BackusersComponent;
  let fixture: ComponentFixture<BackusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
