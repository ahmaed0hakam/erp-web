import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TenantService } from '../shared/services/tenant/tenant.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.sass'
})
export class LandingComponent {

  _tenantService = inject(TenantService)

  tenantInfo: any = {};


  ngOnInit() {
    this._tenantService.tenantInfo.subscribe((info) => {
      this.tenantInfo = info;
    });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - 100, // Header height
        behavior: 'smooth'
      });
    }
  }

}
