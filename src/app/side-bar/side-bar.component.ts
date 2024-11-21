import { Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [MatSidenavModule, MatCheckboxModule, FormsModule, MatButtonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.sass'
})
export class SideBarComponent {
  @Input() isMobile: boolean = false;

  events: string[] = [];
  opened: boolean = true;

  ngOnInit() {
    if (this.isMobile) {
      this.opened = false;
    }
  }

}
