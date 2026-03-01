import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SidebarComponent} from './core/sidebar/sidebar.component';
import {TopbarComponent} from './core/topbar/topbar.component';
import {ConfirmDialogComponent} from './shared/ui/confirm-dialog/confirm-dialog.component';
import {ToastModule} from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    TopbarComponent,
    ConfirmDialogComponent,
    ToastModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'eams-pro';
}
