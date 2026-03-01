import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetFormDialogComponent } from './asset-form-dialog.component';

describe('AssetFormDialogComponent', () => {
  let component: AssetFormDialogComponent;
  let fixture: ComponentFixture<AssetFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
