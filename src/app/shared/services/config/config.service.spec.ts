import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';
import { TranslateService } from '@ngx-translate/core';
import { PLATFORM_ID } from '@angular/core';
import { Direction, Languages } from '../../interfaces/direction';
import { environment } from '../../../../environments/environment';

describe('ConfigService', () => {
  let service: ConfigService;
  let mockTranslateService: jasmine.SpyObj<TranslateService>;
  let mockLocalStorage: { [key: string]: string };

  const mockEnvironment = {
    lang: 'en' as Languages,
    secLang: 'ar' as Languages,
    direction: 'ltr' as Direction
  };

  beforeEach(() => {
    mockTranslateService = jasmine.createSpyObj('TranslateService', ['use']);
    mockLocalStorage = {};

    // Mock localStorage
    spyOn(localStorage, 'getItem').and.callFake((key: string) => mockLocalStorage[key] || null);
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      mockLocalStorage[key] = value;
    });

    // Mock document
    const mockDocument = {
      documentElement: {
        lang: '',
        dir: ''
      }
    };
    Object.defineProperty(window, 'document', { value: mockDocument });

    // Mock environment
    Object.defineProperty(environment, 'lang', { value: mockEnvironment.lang });
    Object.defineProperty(environment, 'secLang', { value: mockEnvironment.secLang });
    Object.defineProperty(environment, 'direction', { value: mockEnvironment.direction });
  });

  describe('Browser Environment', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          ConfigService,
          { provide: TranslateService, useValue: mockTranslateService },
          { provide: PLATFORM_ID, useValue: 'browser' }
        ]
      });
      service = TestBed.inject(ConfigService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should return language from localStorage if available', () => {
      mockLocalStorage['lang'] = 'ar';
      expect(service.getLang()).toBe('ar');
    });

    it('should return environment language if localStorage is empty', () => {
      expect(service.getLang()).toBe(mockEnvironment.lang);
    });

    it('should return secondary language from localStorage if available', () => {
      mockLocalStorage['secLang'] = 'en';
      expect(service.getSecLang()).toBe('en');
    });

    it('should return environment secondary language if localStorage is empty', () => {
      expect(service.getSecLang()).toBe(mockEnvironment.secLang);
    });

    it('should set language and update related settings', () => {
      service.setLang('ar');
      
      expect(mockLocalStorage['lang']).toBe('ar');
      expect(document.documentElement.lang).toBe('ar');
      expect(mockTranslateService.use).toHaveBeenCalledWith('ar');
      expect(mockLocalStorage['direction']).toBe('rtl');
      expect(document.documentElement.dir).toBe('rtl');
      expect(mockLocalStorage['secLang']).toBe('en');
    });

    it('should get direction from localStorage if available', () => {
      mockLocalStorage['direction'] = 'rtl';
      expect(service.getDirection()).toBe('rtl');
    });

    it('should return environment direction if localStorage is empty', () => {
      expect(service.getDirection()).toBe(mockEnvironment.direction);
    });

    it('should correctly identify browser environment', () => {
      expect(service.isBrowser()).toBeTrue();
      expect(service.isServer()).toBeFalse();
    });
  });

  describe('Server Environment', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          ConfigService,
          { provide: TranslateService, useValue: mockTranslateService },
          { provide: PLATFORM_ID, useValue: 'server' }
        ]
      });
      service = TestBed.inject(ConfigService);
    });

    it('should return environment language in server environment', () => {
      expect(service.getLang()).toBe(mockEnvironment.lang);
    });

    it('should return environment secondary language in server environment', () => {
      expect(service.getSecLang()).toBe(mockEnvironment.secLang);
    });

    it('should not modify localStorage or document in server environment', () => {
      service.setLang('ar');
      expect(mockLocalStorage['lang']).toBeUndefined();
      expect(document.documentElement.lang).toBe('');
      expect(mockTranslateService.use).not.toHaveBeenCalled();
    });

    it('should return environment direction in server environment', () => {
      expect(service.getDirection()).toBe(mockEnvironment.direction);
    });

    it('should correctly identify server environment', () => {
      expect(service.isBrowser()).toBeFalse();
      expect(service.isServer()).toBeTrue();
    });
  });
}); 