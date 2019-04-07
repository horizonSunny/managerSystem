import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacksheaderComponent } from './backsheader.component';

describe('BacksheaderComponent', () => {
  let component: BacksheaderComponent;
  let fixture: ComponentFixture<BacksheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BacksheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacksheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
