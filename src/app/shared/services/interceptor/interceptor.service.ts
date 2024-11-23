import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.url.includes('/assets/') || req.url.includes('https'))
            return next.handle(req);

        // Clone the request to add a custom header (like Authorization)4
        const authReq = req.clone({
            url: `${environment.apiUrl}${req.url}`,
            headers: req.headers.set('Authorization', 'Bearer YOUR_TOKEN_HERE')
        });

        // Pass the cloned request instead of the original request to the next handler
        return next.handle(authReq);
    }
}
