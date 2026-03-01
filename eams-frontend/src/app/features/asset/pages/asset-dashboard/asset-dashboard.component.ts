import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {AssetTableComponent} from '../../components/asset-table/asset-table.component';
import {AssetFormDialogComponent} from '../../components/asset-form-dialog/asset-form-dialog.component';
import {AssetStore} from '../../store/asset.store';
import {ConfirmationService} from 'primeng/api';
import {Asset} from '../../models/asset.model';

@Component({
  selector: 'app-asset-dashboard',
  standalone: true,
  imports: [CommonModule, ButtonModule, AssetTableComponent, AssetFormDialogComponent],
  templateUrl: './asset-dashboard.component.html',
  styleUrl: './asset-dashboard.component.scss'
})
export class AssetDashboardComponent implements OnInit {
  readonly store = inject(AssetStore);
  private confirmationService = inject(ConfirmationService);

  dialogVisible = signal(false)
  selectedAsset = signal<Asset | null>(null)

  ngOnInit() {
    this.store.loadAssets({page:0, size: 10});
  }

  onPageChange(event:{page: number, size: number}) {
    this.store.loadAssets(event)
  }

  onEditAsset(asset: Asset) {
    this.selectedAsset.set(asset)
    this.dialogVisible.set(true)
  }

  onDeleteAsset(asset: Asset) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${asset.name} (${asset.serialNumber})?`,
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.deleteAsset(asset.id);
      }
    })
  }

  openCreateDialog() {
    this.selectedAsset.set(null); // Null means "Create Mode"
    this.dialogVisible.set(true);
  }

  onSaveAsset(payload: any) {
    if (this.selectedAsset()) {
      this.store.updateAsset(payload);
    } else {
      this.store.createAsset(payload);
    }

    this.dialogVisible.set(false);
  }
}
