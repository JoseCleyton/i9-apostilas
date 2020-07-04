import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, NgModule } from '@angular/core';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem('i9-token') === null) {
            return next.handle(req)
        }else{
            const dupReq = req.clone({
                setHeaders:{
                    'i9-token': localStorage.getItem('i9-token'),
                }
            });
            return next.handle(dupReq);
        }
    }
}

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpsRequestInterceptor,
            multi: true,
        },
    ],
})


export class Interceptor { }