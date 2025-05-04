import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../shared/services/config/config.service';
import { SharedService } from '../shared/services/shared/shared.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { BehaviorSubject } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockTranslateService: jasmine.SpyObj<TranslateService>;
  let mockConfigService: jasmine.SpyObj<ConfigService>;
  let mockSharedService: SharedService;
  let isLoggedInSubject: BehaviorSubject<boolean>;
  let isMobileSubject: BehaviorSubject<boolean>;

  beforeEach(async () => {
    isLoggedInSubject = new BehaviorSubject<boolean>(false);
    isMobileSubject = new BehaviorSubject<boolean>(false);

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockTranslateService = jasmine.createSpyObj('TranslateService', ['use']);
    mockConfigService = jasmine.createSpyObj('ConfigService', ['getSecLang', 'setLang']);
    mockSharedService = new SharedService();

    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        MatToolbarModule,
        MatIconModule,
        TranslateModule,
        MatTooltipModule,
        MatButtonModule,
        MatMenuModule
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: TranslateService, useValue: mockTranslateService },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: SharedService, useValue: mockSharedService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.isMobile).toBeFalse();
    expect(component.isLoggedIn).toBeFalse();
    expect(component.items.leftSide).toEqual([]);
    expect(component.items.rightSide).toEqual([]);
  });

  it('should navigate to correct path', () => {
    const testPath = 'test-path';
    component.navigate(testPath);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/' + testPath]);
  });

  it('should switch language and reload page', () => {
    const mockSecLang = 'ar';
    mockConfigService.getSecLang.and.returnValue(mockSecLang);
    
    spyOn(window.location, 'reload');
    
    component.switchLang();
    
    expect(mockConfigService.getSecLang).toHaveBeenCalled();
    expect(mockConfigService.setLang).toHaveBeenCalledWith(mockSecLang);
    expect(window.location.reload).toHaveBeenCalled();
  });

  it('should update login state when shared service emits', () => {
    mockSharedService.setIsLoggedIn(true);
    expect(component.isLoggedIn).toBeTrue();
  });

  it('should update mobile state when shared service emits', () => {
    mockSharedService.setIsMobile(true);
    expect(component.isMobile).toBeTrue();
  });
});
