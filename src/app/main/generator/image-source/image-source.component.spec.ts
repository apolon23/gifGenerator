import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSourceComponent } from './image-source.component';

describe('ImageSourceComponent', () => {
  let component: ImageSourceComponent;
  let fixture: ComponentFixture<ImageSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
