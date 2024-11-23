import { Component, inject, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { Language, TranslateService, TranslateStore } from '@ngx-translate/core'; // Import TranslateService
import { ConfigService } from './shared/services/config/config.service';
import { config } from 'rxjs';
import { environment } from '../environments/environment';
import { Languages } from './shared/interfaces/direction';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    SideBarComponent
  ],
  providers: [TranslateService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'erp-web';
  isMobile: any;
  isLoading!: boolean;

  private _config = inject(ConfigService) ;
  private _translate = inject(TranslateService);
  private _router = inject(Router); 
  private _breakpointObserver = inject(BreakpointObserver);


  constructor(
  ) {
    const lang = this._config.getLang()
    this._config.setLang(lang)
  }
  /**
   * Initializes the component by setting up mobile device detection and navigation loading states.
   * This method is automatically called by Angular when the component is initialized.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    // Use BreakpointObserver to check if it's mobile
    this._breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
    });

    // Router events for loading states
    this._router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.isLoading = false;
      }
    });
  }
}
