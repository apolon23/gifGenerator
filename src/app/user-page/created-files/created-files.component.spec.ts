import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedFilesComponent } from './created-files.component';

describe('CreatedFilesComponent', () => {
  let component: CreatedFilesComponent;
  let fixture: ComponentFixture<CreatedFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
