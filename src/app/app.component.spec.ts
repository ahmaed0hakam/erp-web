import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SharedService } from './shared/services/shared/shared.service';
import { ConfigService } from './shared/services/config/config.service';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: any;
  let mockRouter: any;
  let mockBreakpointObserver: any;
  let mockSharedService: any;
  let mockConfigService: any;
  let mockTranslateService: any;
  let isLoggedInSubject: BehaviorSubject<boolean>;

  beforeEach(async () => {
    isLoggedInSubject = new BehaviorSubject<boolean>(false);
    
    mockRouter = {
      events: {
        pipe: () => ({
          subscribe: (callback: any) => {
            callback(new NavigationStart(1, 'test'));
            callback(new NavigationEnd(1, 'test', 'test'));
          }
        })
      }
    };

    mockBreakpointObserver = {
      observe: () => ({
        subscribe: (callback: any) => {
          callback({ matches: true });
        }
      })
    };

    mockSharedService = {
      setIsMobile: jasmine.createSpy('setIsMobile'),
      isLoggedIn: isLoggedInSubject
    };

    mockConfigService = {
      getLang: jasmine.createSpy('getLang').and.returnValue('en'),
      setLang: jasmine.createSpy('setLang')
    };

    mockTranslateService = {
      use: jasmine.createSpy('use')
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: BreakpointObserver, useValue: mockBreakpointObserver },
        { provide: SharedService, useValue: mockSharedService },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: TranslateService, useValue: mockTranslateService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.title).toEqual('erp-web');
    expect(component.isLoggedIn).toBeFalse();
  });

  it('should handle mobile detection', () => {
    expect(mockSharedService.setIsMobile).toHaveBeenCalledWith(true);
  });

  it('should update login state when shared service emits', () => {
    isLoggedInSubject.next(true);
    expect(component.isLoggedIn).toBeTrue();
  });

  it('should handle navigation events', () => {
    expect(component.isLoading).toBeDefined();
  });

  it('should initialize language settings', () => {
    expect(mockConfigService.getLang).toHaveBeenCalled();
    expect(mockConfigService.setLang).toHaveBeenCalled();
  });
});
