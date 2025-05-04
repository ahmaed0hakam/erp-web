import { TestBed } from '@angular/core/testing';
import { SharedService } from './shared.service';
import { BehaviorSubject } from 'rxjs';

describe('SharedService', () => {
  let service: SharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedService]
    });
    service = TestBed.inject(SharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Login State Management', () => {
    it('should initialize with logged out state', (done) => {
      service.isLoggedIn.subscribe(isLoggedIn => {
        expect(isLoggedIn).toBeFalse();
        done();
      });
    });

    it('should update login state', (done) => {
      service.isLoggedIn.subscribe(isLoggedIn => {
        if (isLoggedIn) {
          expect(isLoggedIn).toBeTrue();
          done();
        }
      });
      service.setIsLoggedIn(true);
    });
  });

  describe('Mobile Detection', () => {
    it('should initialize with non-mobile state', (done) => {
      service.isMobile.subscribe(isMobile => {
        expect(isMobile).toBeFalse();
        done();
      });
    });

    it('should update mobile state', (done) => {
      service.isMobile.subscribe(isMobile => {
        if (isMobile) {
          expect(isMobile).toBeTrue();
          done();
        }
      });
      service.setIsMobile(true);
    });
  });

  describe('Generic Subject Management', () => {
    it('should create and update a new subject', (done) => {
      const testKey = 'testKey';
      const testValue = 'testValue';

      service.get(testKey).subscribe(value => {
        if (value === testValue) {
          expect(value).toBe(testValue);
          done();
        }
      });

      service.set(testKey, testValue);
    });

    it('should return null for non-existent keys', (done) => {
      const nonExistentKey = 'nonExistentKey';
      
      service.get(nonExistentKey).subscribe(value => {
        expect(value).toBeNull();
        done();
      });
    });

    it('should maintain separate subjects for different keys', (done) => {
      const key1 = 'key1';
      const key2 = 'key2';
      const value1 = 'value1';
      const value2 = 'value2';

      let receivedKey1 = false;
      let receivedKey2 = false;

      service.get(key1).subscribe(value => {
        if (value === value1) {
          receivedKey1 = true;
          if (receivedKey2) done();
        }
      });

      service.get(key2).subscribe(value => {
        if (value === value2) {
          receivedKey2 = true;
          if (receivedKey1) done();
        }
      });

      service.set(key1, value1);
      service.set(key2, value2);
    });

    it('should update existing subjects', (done) => {
      const testKey = 'testKey';
      const initialValue = 'initial';
      const updatedValue = 'updated';

      let receivedInitial = false;

      service.get(testKey).subscribe(value => {
        if (value === initialValue) {
          receivedInitial = true;
        } else if (value === updatedValue && receivedInitial) {
          expect(value).toBe(updatedValue);
          done();
        }
      });

      service.set(testKey, initialValue);
      service.set(testKey, updatedValue);
    });
  });
});