import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import '../../common/rxjs-operators';
import { URL_API } from '../../common/const-util';
import { ICity } from '../../interfaces/city.interface'


@Injectable()
export class RegisterService {

    constructor(private http: Http) { }

    private apiUrl = 'city/City';

    getAllCities(): Observable<ICity[]> {
        return this.http.get(`${URL_API}/${this.apiUrl}`)
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