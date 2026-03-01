import {Component, input, output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {TagModule} from 'primeng/tag';
import {EmptyStateComponent} from '../../../../shared/ui/empty-state/empty-state.component';
import {Asset} from '../../models/asset.model';
import {Tooltip} from 'primeng/tooltip';

@Component({
  selector: 'app-asset-table',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TagModule, EmptyStateComponent, Tooltip],
  templateUrl: './asset-table.component.html',
  styleUrl: './asset-table.component.scss'
})
export class AssetTableComponent {
  assets = input.required<Asset[]>();
  totalElements = input.required<number>();
  pageSize = input.required<number>();
  loading = input.required<boolean>();

  pageChange = output<{page: number, size: number}>();
  editAsset = output<Asset>();
  deleteAsset = output<Asset>();

  // PrimeNG Lazy Load Event Handler
  onLazyLoad(event: any) {
    const pageIndex = Math.floor((event.first || 0) / (event.rows || 10));
    const size = event.rows || 10

    this.pageChange.emit({page: pageIndex, size: size})
  }

  // Maps backend enum status to PrimeNG tag colors
  getSeverity(status: string): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' {
    switch(status) {
      case 'IN_USE': return 'success';
      case 'AVAILABLE': return 'info';
      case 'MAINTENANCE': return 'warn';
      case 'RETIRED': return 'danger';
      default: return 'secondary';
    }
  }
}
