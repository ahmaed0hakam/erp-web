import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideBarComponent } from './side-bar.component';
import { SharedService } from '../shared/services/shared/shared.service';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

describe('SideBarComponent', () => {
  let component: SideBarComponent;
  let fixture: ComponentFixture<SideBarComponent>;
  let mockSharedService: any;
  let mockTranslateService: any;
  let isMobileSubject: BehaviorSubject<boolean>;

  beforeEach(async () => {
    isMobileSubject = new BehaviorSubject<boolean>(false);
    
    mockSharedService = {
      isMobile: isMobileSubject
    };

    mockTranslateService = {
      use: jasmine.createSpy('use')
    };

    await TestBed.configureTestingModule({
      imports: [
        SideBarComponent,
        CommonModule,
        MatIcon,
        TranslateModule
      ],
      providers: [
        { provide: SharedService, useValue: mockSharedService },
        { provide: TranslateService, useValue: mockTranslateService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.isMobile).toBeFalse();
    expect(component.opened).toBeFalse();
    expect(component.width).toBe(70);
    expect(component.expandedWidth).toBe(260);
    expect(component.items.length).toBe(6);
  });

  it('should have correct menu items', () => {
    const expectedItems = [
      { name: 'home', icon: 'home' },
      { name: 'dashboard', icon: 'dashboard' },
      { name: 'users', icon: 'people' },
      { name: 'products', icon: 'shopping_cart' },
      { name: 'settings', icon: 'settings' },
      { name: 'logout', icon: 'exit_to_app' }
    ];
    expect(component.items).toEqual(expectedItems);
  });

  it('should update mobile state when shared service emits', () => {
    isMobileSubject.next(true);
    expect(component.isMobile).toBeTrue();
  });

  it('should expand sidebar when expandSidebar is called', () => {
    component.expandSidebar();
    expect(component.width).toBe(260);
    expect(component.opened).toBeTrue();
  });

  it('should collapse sidebar when collapseSidebar is called', () => {
    // First expand the sidebar
    component.expandSidebar();
    // Then collapse it
    component.collapseSidebar();
    expect(component.width).toBe(70);
    expect(component.opened).toBeFalse();
  });

  it('should have the correct host binding for mobile class', () => {
    const element = fixture.nativeElement;
    expect(element.classList.contains('mobile')).toBeFalse();
    
    isMobileSubject.next(true);
    fixture.detectChanges();
    expect(element.classList.contains('mobile')).toBeTrue();
  });
});
