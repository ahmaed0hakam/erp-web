import { TestBed } from '@angular/core/testing';
import { TenantService } from './tenant.service';
import { BehaviorSubject } from 'rxjs';

describe('TenantService', () => {
  let service: TenantService;
  const defaultTenantInfo = {
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
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TenantService]
    });
    service = TestBed.inject(TenantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default tenant info', (done) => {
    service.tenantInfo.subscribe(info => {
      expect(info).toEqual(defaultTenantInfo);
      done();
    });
  });

  it('should update tenant info correctly', (done) => {
    const newTenantInfo = {
      name: 'New Tenant Name',
      logo: 'new-logo.png',
      description: 'New description',
      banner: 'new-banner.png',
      infoImage: 'new-info-image.png',
      infoBoxes: [
        { title: 'New Team Size', description: 'New team description' }
      ]
    };

    service.tenantInfo.subscribe(info => {
      if (info.name === 'New Tenant Name') {
        expect(info).toEqual(newTenantInfo);
        done();
      }
    });

    service.updateTenantInfo(newTenantInfo);
  });

  it('should maintain the same structure when updating tenant info', (done) => {
    const newTenantInfo = {
      name: 'Another Tenant',
      logo: 'another-logo.png',
      description: 'Another description',
      banner: 'another-banner.png',
      infoImage: 'another-info-image.png',
      infoBoxes: [
        { title: 'Another Team Size', description: 'Another team description' }
      ]
    };

    service.tenantInfo.subscribe(info => {
      if (info.name === 'Another Tenant') {
        const expectedKeys = ['name', 'logo', 'description', 'banner', 'infoImage', 'infoBoxes'];
        expect(Object.keys(info)).toEqual(expectedKeys);
        expect('name' in info).toBeTrue();
        expect('logo' in info).toBeTrue();
        expect('description' in info).toBeTrue();
        expect('banner' in info).toBeTrue();
        expect('infoImage' in info).toBeTrue();
        expect('infoBoxes' in info).toBeTrue();
        expect(Array.isArray(info.infoBoxes)).toBeTrue();
        done();
      }
    });

    service.updateTenantInfo(newTenantInfo);
  });

  it('should emit new values to all subscribers', (done) => {
    const newTenantInfo = {
      name: 'Multiple Subscribers Test',
      logo: 'test-logo.png',
      description: 'Test description',
      banner: 'test-banner.png',
      infoImage: 'test-info-image.png',
      infoBoxes: [
        { title: 'Test Team Size', description: 'Test team description' }
      ]
    };

    let subscriber1Received = false;
    let subscriber2Received = false;

    service.tenantInfo.subscribe(info => {
      if (info.name === 'Multiple Subscribers Test') {
        subscriber1Received = true;
        if (subscriber2Received) {
          done();
        }
      }
    });

    service.tenantInfo.subscribe(info => {
      if (info.name === 'Multiple Subscribers Test') {
        subscriber2Received = true;
        if (subscriber1Received) {
          done();
        }
      }
    });

    service.updateTenantInfo(newTenantInfo);
  });
}); 