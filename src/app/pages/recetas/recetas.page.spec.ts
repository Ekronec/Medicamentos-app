import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecetasPage } from './recetas.page';

describe('RecetasPage', () => {
  let component: RecetasPage;
  let fixture: ComponentFixture<RecetasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecetasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
function async(arg0: () => void): jasmine.ImplementationCallback {
  throw new Error('Function not implemented.');
}

