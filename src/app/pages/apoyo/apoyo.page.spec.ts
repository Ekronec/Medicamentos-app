import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApoyoPage } from './apoyo.page';

describe('ApoyoPage', () => {
  let component: ApoyoPage;
  let fixture: ComponentFixture<ApoyoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ApoyoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
