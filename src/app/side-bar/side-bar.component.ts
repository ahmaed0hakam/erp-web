import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

interface MenuItem {
  name: string;
  icon: string;
}

@Component({
  standalone: true,
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.sass'],
  host: {
    '[class.mobile]': 'isMobile'
  },
  imports: [
    CommonModule,
    MatIcon,
    TranslateModule
  ]
})
export class SideBarComponent {
  @Input() isMobile: boolean = false;

  events: string[] = [];
  opened: boolean = false;
  items: MenuItem[] = [
    { name: 'home', icon: 'home' },
    { name: 'dashboard', icon: 'dashboard' },
    { name: 'users', icon: 'people' },
    { name: 'products', icon: 'shopping_cart' },
    { name: 'settings', icon: 'settings' },
    { name: 'logout', icon: 'exit_to_app' }
  ];

  @ViewChild('sidebar', { static: true }) sidebarRef!: ElementRef;
  width: number = 70;
  expandedWidth: number = 260;

  // Expand the sidebar to full width on hover
  expandSidebar(): void {
    this.width = this.expandedWidth;
    this.opened = true;
  }

  // Collapse the sidebar to its default width when hover ends
  collapseSidebar(): void {
    this.width = 70;
    this.opened = false;
  }
}
