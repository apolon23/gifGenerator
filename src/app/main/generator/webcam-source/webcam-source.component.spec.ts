import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcamSourceComponent } from './webcam-source.component';

describe('WebcamSourceComponent', () => {
  let component: WebcamSourceComponent;
  let fixture: ComponentFixture<WebcamSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebcamSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
