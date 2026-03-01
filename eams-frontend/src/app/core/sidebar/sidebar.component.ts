import { Component } from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  navItems = [
    { label: 'Dashboard', icon: 'pi pi-home', route: '/dashboard' },
    { label: 'Assets', icon: 'pi pi-desktop', route: '/assets' },
    { label: 'Work Orders', icon: 'pi pi-wrench', route: '/work-orders' },
    { label: 'Settings', icon: 'pi pi-cog', route: '/settings' }
  ];
}
