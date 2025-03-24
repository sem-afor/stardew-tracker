import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSaveDataDialogComponent } from './create-save-data-dialog.component';

describe('CreateSaveDataDialogComponent', () => {
  let component: CreateSaveDataDialogComponent;
  let fixture: ComponentFixture<CreateSaveDataDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSaveDataDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSaveDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
