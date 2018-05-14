import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GifRedactorComponent } from './gif-redactor.component';

describe('GifRedactorComponent', () => {
  let component: GifRedactorComponent;
  let fixture: ComponentFixture<GifRedactorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GifRedactorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GifRedactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
