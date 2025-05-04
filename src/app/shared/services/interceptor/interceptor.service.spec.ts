import { TestBed } from '@angular/core/testing';
import { ApiInterceptor } from './interceptor.service';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';

describe('ApiInterceptor', () => {
  let interceptor: ApiInterceptor;
  let mockHandler: jasmine.SpyObj<HttpHandler>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiInterceptor]
    });
    interceptor = TestBed.inject(ApiInterceptor);
    mockHandler = jasmine.createSpyObj('HttpHandler', ['handle']);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should not modify requests to assets or external URLs', () => {
    const assetRequest = new HttpRequest('GET', '/assets/test.png');
    const externalRequest = new HttpRequest('GET', 'https://external.com/api');
    const mockEvent = {} as HttpEvent<any>;

    mockHandler.handle.and.returnValue(of(mockEvent));

    interceptor.intercept(assetRequest, mockHandler).subscribe();
    expect(mockHandler.handle).toHaveBeenCalledWith(assetRequest);

    mockHandler.handle.calls.reset();
    interceptor.intercept(externalRequest, mockHandler).subscribe();
    expect(mockHandler.handle).toHaveBeenCalledWith(externalRequest);
  });

  it('should modify API requests with base URL and authorization header', () => {
    const originalRequest = new HttpRequest('GET', '/api/test');
    const mockEvent = {} as HttpEvent<any>;

    mockHandler.handle.and.callFake((req: HttpRequest<any>) => {
      expect(req.url).toBe(`${environment.apiUrl}/api/test`);
      expect(req.headers.get('Authorization')).toBe('Bearer YOUR_TOKEN_HERE');
      return of(mockEvent);
    });

    interceptor.intercept(originalRequest, mockHandler).subscribe();
    expect(mockHandler.handle).toHaveBeenCalled();
  });

  it('should preserve original request method and body', () => {
    const originalRequest = new HttpRequest('POST', '/api/test', { data: 'test' });
    const mockEvent = {} as HttpEvent<any>;

    mockHandler.handle.and.callFake((req: HttpRequest<any>) => {
      expect(req.method).toBe('POST');
      expect(req.body).toEqual({ data: 'test' });
      return of(mockEvent);
    });

    interceptor.intercept(originalRequest, mockHandler).subscribe();
    expect(mockHandler.handle).toHaveBeenCalled();
  });

  it('should preserve original headers while adding authorization', () => {
    const originalRequest = new HttpRequest('GET', '/api/test', {
      headers: new Headers({ 'Content-Type': 'application/json' })
    });
    const mockEvent = {} as HttpEvent<any>;

    mockHandler.handle.and.callFake((req: HttpRequest<any>) => {
      expect(req.headers.get('Content-Type')).toBe('application/json');
      expect(req.headers.get('Authorization')).toBe('Bearer YOUR_TOKEN_HERE');
      return of(mockEvent);
    });

    interceptor.intercept(originalRequest, mockHandler).subscribe();
    expect(mockHandler.handle).toHaveBeenCalled();
  });
});