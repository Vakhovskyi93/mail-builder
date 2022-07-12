import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClickComponent } from './edit-click.component';

describe('EditClickComponent', () => {
  let component: EditClickComponent;
  let fixture: ComponentFixture<EditClickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditClickComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
