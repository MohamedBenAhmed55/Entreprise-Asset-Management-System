import {Component, effect, input, model, output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {DatePickerModule} from 'primeng/datepicker';
import {Asset} from '../../models/asset.model';
import {AssetStatus as assetStatuses, AssetType as assetTypes} from '../../models/asset-enums';
import {formatDateForBackend, parseDateFromBacked} from '../../../../shared/utils/date.utils';


@Component({
  selector: 'app-asset-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    DatePickerModule
  ],
  templateUrl: './asset-form-dialog.component.html',
  styleUrl: './asset-form-dialog.component.scss'
})
export class AssetFormDialogComponent {
  // Use Angular 18's model() for two-way binding with the PrimeNG Dialog visibility
  visible = model<boolean>(false)

  // Input: If provided, we are in "Edit" mode. If null, we are in "Create" mode.
  asset = input<Asset | null>(null);
  loading = input<boolean>(false);

  // Output: Emits the fully formatted payload back to the Smart Dashboard
  save = output<any>();

  // Strongly typed Reactive Form
  form = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    serialNumber: new FormControl<string>('', [Validators.required]),
    type: new FormControl<string>(assetTypes.LAPTOP, [Validators.required]),
    status: new FormControl<string>(assetStatuses.AVAILABLE, [Validators.required]),
    purchaseDate: new FormControl<Date | null>(null, [Validators.required]),
    location: new FormControl<string>(''),
  })

  assetTypes = [...assetTypes]
  assetStatuses = [...assetStatuses]

  constructor(){
    effect(() => {
      const currentAsset = this.asset()
      if(currentAsset) {
        //Edit Mode
        this.form.patchValue({
          ...currentAsset,
          purchaseDate: parseDateFromBacked(currentAsset.purchaseDate)
        } as any);
      } else {
        this.form.reset({type: assetTypes.LAPTOP, status: assetStatuses.AVAILABLE})
      }
    });
  }

  hideDialog() {
    this.visible.set(false)
    this.form.reset({type: assetTypes.LAPTOP, status: assetStatuses.AVAILABLE})
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();

    const payload = {
      ...formValue,
      purchaseDate: formatDateForBackend(formValue.purchaseDate)
    };

    if (this.asset()){
      payload['id'] = this.asset()!.id;
    }

    this.save.emit(payload);
  }
}
