import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaceheaderComponent } from './baceheader.component';

describe('BaceheaderComponent', () => {
  let component: BaceheaderComponent;
  let fixture: ComponentFixture<BaceheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaceheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaceheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
