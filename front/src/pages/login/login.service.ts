import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import '../../common/rxjs-operators';
import { URL_API } from '../../common/const-util';
import { IResponseUtil } from '../../interfaces/responseUtil.interface';


@Injectable()
export class LoginService {

    private authUrl = 'user/Auth';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }
    
    loginUser(body: Object): Observable<IResponseUtil[]> {
        let options = new RequestOptions({ headers: this.headers });
        return this.http.post(`${URL_API}${this.authUrl}`, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        if (Array.isArray(body)) {
            return body || {};
        } else if (typeof body == "object") {
            return Array.of(body) || {};
        }else{
            return body;
        }
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }
}