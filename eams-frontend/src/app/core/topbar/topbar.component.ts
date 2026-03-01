import { Component } from '@angular/core';
import {AvatarModule} from 'primeng/avatar';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, AvatarModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  // We'll mock the user for now since we've decided not to implement auth for this project
  userName = 'Admin User';
}
