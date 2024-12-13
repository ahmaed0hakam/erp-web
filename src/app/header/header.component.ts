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
import { SharedService } from '../shared/services/shared/shared.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    TranslateModule,
    MatTooltip,
    MatIconButton,
    MatMenuModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent {

  isMobile: boolean = false;
  isLoggedIn: boolean = false;

  private _translate = inject(TranslateService);
  private _config = inject(ConfigService);
  private _router = inject(Router);
  private _sharedService = new SharedService
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

  constructor() {
    this._sharedService.isLoggedIn.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    })
  }

  switchLang() {
    const secLang = this._config.getSecLang();

    this._config.setLang(secLang)
    window.location.reload();
  }

  ngOnInit() {
    this._sharedService.isMobile.subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }
}
