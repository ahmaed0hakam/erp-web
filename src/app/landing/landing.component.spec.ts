import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingComponent } from './landing.component';
import { TenantService } from '../shared/services/tenant/tenant.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let mockTenantService: jasmine.SpyObj<TenantService>;
  let tenantInfoSubject: BehaviorSubject<any>;

  beforeEach(async () => {
    tenantInfoSubject = new BehaviorSubject<any>({});
    mockTenantService = jasmine.createSpyObj('TenantService', [], {
      tenantInfo: tenantInfoSubject.asObservable()
    });

    await TestBed.configureTestingModule({
      imports: [
        LandingComponent,
        CommonModule,
        TranslateModule
      ],
      providers: [
        { provide: TenantService, useValue: mockTenantService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty tenant info', () => {
    expect(component.tenantInfo).toEqual({});
  });

  it('should update tenant info when service emits', () => {
    const mockTenantData = {
      name: 'Test Tenant',
      logo: 'test-logo.png',
      description: 'Test description'
    };

    tenantInfoSubject.next(mockTenantData);
    expect(component.tenantInfo).toEqual(mockTenantData);
  });

  it('should scroll to section when element exists', () => {
    const mockElement = document.createElement('div');
    mockElement.id = 'test-section';
    document.body.appendChild(mockElement);

    const scrollToSpy = spyOn(window, 'scrollTo');
    const getBoundingClientRectSpy = spyOn(mockElement, 'getBoundingClientRect').and.returnValue({
      top: 100
    } as DOMRect);

    component.scrollToSection('test-section');

    expect(scrollToSpy).toHaveBeenCalledWith(0, jasmine.any(Number));

    document.body.removeChild(mockElement);
  });

  it('should not scroll when element does not exist', () => {
    const scrollToSpy = spyOn(window, 'scrollTo');
    component.scrollToSection('non-existent-section');
    expect(scrollToSpy).not.toHaveBeenCalled();
  });
});
