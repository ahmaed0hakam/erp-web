import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  private _tenantInfo = new BehaviorSubject<any>({
    name: 'Your Tenant Name',
    logo: 'logo.png',
    description: 'lorem ipsum dolor sit amet, consectetur adip inc lorem ipsum dolor sit amet, consectetur adip inc lorem ipsum dolor sit amet, consectetur adip inc',
    banner: 'assets/images/defaults/banner.png',
    infoImage: 'assets/images/defaults/info-image.png',
    infoBoxes: [
      { title: 'Team Size', description: 'lorem ipsum dolor sit amet, consectetur adip inc lorem ipsum dolor sit amet, consectetur adip inc lorem ipsum dolor sit amet, consectetur adip inc' },
      { title: 'Years in Business', description: 'lorem ipsum dolor sit amet, consectetur adip inc lorem ipsum dolor sit amet, consectetur adip inc lorem ipsum dolor sit amet, consectetur adip inclorem ipsum dolor sit amet, consectetur adip inc lorem ipsum dolor sit amet, consectetur adip inc lorem ipsum dolor sit amet, consectetur adip inc' },
      { title: 'Database Systems', description: 'SQL, NoSQL, MongoDB lorem ipsum dolor sit amet, consectetur adip inc lorem ipsum dolor sit amet, consectetur adip inc lorem ipsum dolor sit amet, consectetur adip inc' },
      { title: 'Programming Languages', description: 'Python, Java, JavaScript lorem ipsum dolor sit amet, consectetur adip inc lorem ipsum dolor sit amet, consectetur adip inc lorem ipsum dolor sit amet, consectetur adip inc' }
    ]
  });

  get tenantInfo(): Observable<any> {
    return this._tenantInfo.asObservable();
  }
//   public tenantInfo$ = this._tenantInfo.asObservable();

  constructor() { }

  updateTenantInfo(newInfo: any) {
    this._tenantInfo.next(newInfo);
  }
}
