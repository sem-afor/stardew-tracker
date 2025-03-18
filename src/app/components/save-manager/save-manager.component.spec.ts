import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveManagerComponent } from './save-manager.component';

describe('SaveManagerComponent', () => {
  let component: SaveManagerComponent;
  let fixture: ComponentFixture<SaveManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaveManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
