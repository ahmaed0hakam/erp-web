import { Component, inject, Input, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../shared/services/config/config.service';
import { Languages } from '../shared/interfaces/direction';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconButton } from '@angular/material/button';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    TranslateModule,
    MatTooltip,
    MatIconButton,
    MatMenuModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass'
})
export class NavbarComponent {

  @Input() isMobile: boolean = false;

  private _translate = inject(TranslateService);
  private _config = inject(ConfigService);
  private _router = inject(Router);
  secLang = this._config.getSecLang();


  items: any = {
    leftSide: [
    ],

    rightSide: [
    ]
  }

  navigate(path: string) {
    this._router.navigate(['/' + path]);
  }

  constructor() { }

  switchLang() {
    const secLang = this._config.getSecLang();

    this._config.setLang(secLang)
    window.location.reload();
  }

  ngOnInit() {
  }
}
