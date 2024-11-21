import { Component, inject } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SideBarComponent } from './side-bar/side-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    SideBarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'erp-web';
  isMobile: any;
  sidebarOpen!: boolean;
  isLoading!: boolean;
  private router = inject(Router) 

  ngOnInit(): void {

    this.isMobile = this.checkMobile()    

    if(this.isMobile)
      this.sidebarOpen = false;

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true
        if(this.isMobile)
          this.sidebarOpen = false;
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.isLoading = false;
      }
    }
    );
  }

  checkMobile(){
    return window.innerWidth <= 768; 
  }
}
