import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}

  get(config: HttpGetConfig): Observable<any> {
    return this.http.get<any>(config.url, config.options);
  }
}

export interface HttpGetConfig {
  url: string,
  options?: {
    params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
  }
  onNext?: (rs: any) => void,
  onError?: (rs: any) => void
}

