import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BMainComponent } from './b-main.component';

describe('BMainComponent', () => {
  let component: BMainComponent;
  let fixture: ComponentFixture<BMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
